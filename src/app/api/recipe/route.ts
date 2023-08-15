import { DEFAULT_SYSTEM_PROMPT, DEFAULT_TEMPERATURE } from '@/utils/app/const';
import { OpenAIError, OpenAIStream } from '@/utils/server';
import * as fs from 'fs/promises';
import { ChatBody, Message } from '@/types/chat';


import tiktokenModel from '@dqbd/tiktoken/encoders/cl100k_base.json';
import { Tiktoken, init } from '@dqbd/tiktoken/lite/init';
import { OpenAIModelID, OpenAIModels } from '@/types/openai';

export const runtime = 'edge'

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = (await req.json()) as ChatBody;

    const wasmBuffer = await fs.readFile('node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm');
    
    await init((imports) => WebAssembly.instantiate(wasmBuffer, imports));
    const encoding = new Tiktoken(

      tiktokenModel.bpe_ranks,
      tiktokenModel.special_tokens,
      tiktokenModel.pat_str,
    );

    let promptToSend = `You are a recipe generator. You are asked to generate a recipe with the following params:
    ${JSON.stringify(body)}
    
    Return the response as a HTML formatted string with tailwind classes, in order to style the result.
    Don't add any comments or extra text, just return the recipe.
    Don't add images.
    Units should be standard european (grams, meters...).
    `

    let temperatureToUse = 0.8;
    if (temperatureToUse == null) {
      temperatureToUse = DEFAULT_TEMPERATURE;
    }

    const prompt_tokens = encoding.encode(promptToSend);

    let tokenCount = prompt_tokens.length;
    let messagesToSend: Message[] = [];
    const messages = [] as Message[];
    const model = OpenAIModels[OpenAIModelID.GPT_4];

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const tokens = encoding.encode(message.content);

      if (tokenCount + tokens.length + 1000 > model.tokenLimit) {
        break;
      }
      tokenCount += tokens.length;
      messagesToSend = [message, ...messagesToSend];
    }

    encoding.free();

    const stream = await OpenAIStream(model, promptToSend, temperatureToUse, process.env.OPENAI_API_KEY!, messagesToSend);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    if (error instanceof OpenAIError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

