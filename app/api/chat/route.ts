import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Durée maximale pour laisser le temps au Sage de répondre
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('gemini-1.5-flash'), 
      // On simplifie les instructions pour ne pas surcharger le processeur
      system: `Tu es Mindoguesito, le Sage bienveillant de Ouidah. 
      Réponds toujours de manière chaleureuse. 
      Si on te dit "Bonjour", réponds brièvement en saluant et en proposant ton aide sur le Vodun ou Ouidah.
      Pour les questions complexes, sois détaillé et pédagogique.`,
      messages,
    });

    return result.toDataStreamResponse();

  } catch (error: unknown) {
    console.error("Erreur détectée :", error);
    return new Response(JSON.stringify({ error: "Le Sage est en méditation, réessayez." }), { status: 500 });
  }
}