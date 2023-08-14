import { OpenaiService } from '@/lib/openai/openai';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { CreateChatCompletionResponseChoicesInner } from 'openai';

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.json();
  const openai = new OpenaiService();
  let response: CreateChatCompletionResponseChoicesInner ={};

  try {
    response = await openai.createChatCompletion({
      messages: [
        {
          role: 'system',
          content: `You are a recipe generator. You are asked to generate a recipe with the following params:
        ${JSON.stringify(body)}
        
        Return the response as a HTML formatted string with tailwind classes, in order to style the result.
        Don't add any comments or extra text, just return the recipe.
        Don't add images.
        Units should be standard european (grams, meters...).
        `,
        },
      ],
    });
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }

  return NextResponse.json({ response: response.message?.content });
}
