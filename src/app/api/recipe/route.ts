import { OpenaiService } from '@/lib/openai/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const openai = new OpenaiService();

  const response = await openai.createChatCompletion({
    messages: [
      {
        role: 'system',
        content: `You are a recipe generator. You are asked to generate a recipe with the following params:
      ${JSON.stringify(body)}
      
      Return the response as a HTML formatted string with tailwind classes, in order to style the result.
      Don't add any comments or extra text, just return the recipe.`,
      },
    ],
  });

  return NextResponse.json({ response: response.message?.content });
}
