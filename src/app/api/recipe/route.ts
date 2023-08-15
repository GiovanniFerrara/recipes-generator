import { OpenAIError, OpenAIStream } from '@/utils/server';
import { ChatBody } from '@/types/chat';
import { OpenAIModelID, OpenAIModels } from '@/types/openai';

export const runtime = 'edge'

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = (await req.json()) as ChatBody;

    let promptToSend = `You are a recipe generator. You are asked to generate a recipe with the following params:
    ${JSON.stringify(body)}
    
    Return the response as a HTML formatted string with tailwind classes, in order to style the result.
    Don't add any comments or extra text, just return the HTML recipe. Don't even add the \`\`\`html\`\`\` syntax.
    Don't add images.
    Units should be standard european (grams, meters...).
    `

    const stream = await OpenAIStream(OpenAIModels[OpenAIModelID.GPT_4], promptToSend, 0.8, process.env.OPENAI_API_KEY!, []);

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

