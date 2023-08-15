import { OpenaiService } from '@/lib/openai/openai';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { CreateChatCompletionResponseChoicesInner } from 'openai';


export async function POST(req: Request, res: NextApiResponse) {
  console.log({res})
  const body = await req.json();
  const openai = new OpenaiService();
  let response: CreateChatCompletionResponseChoicesInner = {};
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

    return NextResponse.json({ response: response.message?.content });

  } catch (e) {
    return new NextResponse(JSON.stringify({ error: 'Error generating recipe', details: (e as Error).message }), { status: 500 });
  }
}