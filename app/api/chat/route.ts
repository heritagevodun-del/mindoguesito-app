import { google } from '@ai-sdk/google';
import { generateText } from 'ai'; // On n'utilise plus streamText mais generateText

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // On génère la réponse en un seul bloc (plus robuste que le streaming)
    const { text } = await generateText({
      model: google('gemini-1.5-flash', {
        // On garde les filtres désactivés pour le Vodun
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
      system: `Tu es Mindoguesito, le Sage de Ouidah. Guide spirituel et culturel sur le Vodun.`,
      messages,
    });

    // On renvoie le texte brut
    return new Response(JSON.stringify({ 
      role: 'assistant', 
      content: text 
    }));

  } catch (error: unknown) {
    const errContent = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errContent }), { status: 500 });
  }
}