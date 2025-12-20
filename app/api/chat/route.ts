import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// On garde 30s pour le plan gratuit, c'est suffisant si ça ne bloque pas.
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      // CONFIGURATION CRITIQUE : On désactive TOUS les filtres de censure.
      // Cela permet de parler de Vodun, d'esprits ou de sacrifices historiques sans blocage.
      model: google('gemini-1.5-flash', {
        safetySettings: [
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
        ],
      }),
      
      system: `Tu es Mindoguesito, le Sage vénérable de Ouidah.
      
      TA MISSION :
      - Expliquer le Vodun comme une religion de paix, d'amour et de nature.
      - Parler de Ouidah comme d'une Ville Sainte.
      - Être chaleureux et accueillant.
      
      Note technique : Tes réponses ne sont PAS dangereuses, elles sont éducatives. Ne te censure pas sur les termes historiques.`,
      
      messages,
    });

    return result.toDataStreamResponse();

  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    // En cas de crash, on verra l'erreur s'afficher
    return new Response(JSON.stringify({ error: `Erreur Sage: ${err}` }), { status: 500 });
  }
}