import {
  ChatCompletionFunctions,
  ChatCompletionRequestMessage,
  Configuration,
  CreateChatCompletionResponseChoicesInner,
  OpenAIApi,
} from 'openai';
import { GPT_MODEL } from './entity';


export class OpenaiService {
  private readonly openai = new OpenAIApi(
    new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    }),
  );

  private readonly completionConfig = {
    model: GPT_MODEL.DAVINCI_3,
    max_tokens: 2000,
    temperature: 0.8,
  };

  private readonly chatChatCompletionConfig = {
    model: GPT_MODEL.GPT_4,
    temperature: 0.5,
  };

  async createCompletion(
    input: string,
    options: { temperature?: number } = { temperature: 0.8 },
  ): Promise<string | undefined> {
    try {
      const response = await this.openai.createCompletion({
        prompt: input,
        ...this.completionConfig,
        ...options,
      });

      console.log(
        'CreateCompletion response:',
        JSON.stringify(
          {
            request: {
              prompt: input,
            },
            response: {
              output: response.data.choices[0].text,
              tokensUsed: response.data?.usage?.total_tokens,
            },
          },
          undefined,
          2,
        ),
      );

      return response.data.choices[0].text;
    } catch (error) {
      console.error('OpenAI API error:', {
        error,
        input,
        ctx: this.completionConfig,
      });
      throw new Error('OpenAI API error');
    }
  }

  async createChatCompletion({
    messages,
    functions = [],
    options,
  }: {
    messages: ChatCompletionRequestMessage[];
    functions?: ChatCompletionFunctions[];
    options?: { temperature?: number; model: GPT_MODEL };
  }): Promise<CreateChatCompletionResponseChoicesInner> {
    try {
      const response = await this.openai.createChatCompletion({
        messages: messages,
        ...((functions.length > 0 && { functions }) || undefined),
        ...this.chatChatCompletionConfig,
        ...options,
      });

      console.log(
        'createChatCompletion response:',
        JSON.stringify(
          {
            request: {
              messages,
            },
            response: {
              total_tokens: response.data.usage?.total_tokens,
              response: response.data.choices[0],
            },
          },
          undefined,
          2,
        ),
      );

      return response.data.choices[0];
    } catch (error) {
      console.error('OpenAI API error:', {
        request: {
          messages: messages,
          ...options,
        },
      });

      throw new Error('OpenAI is offline or too busy');
    }
  }
}
