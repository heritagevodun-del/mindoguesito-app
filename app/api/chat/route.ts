import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Note de l'Architecte : Plus de clé en dur ici. On utilise la variable sécurisée.
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // On utilise l'alias intelligent qui fonctionne pour votre compte
    const result = streamText({
      model: google('gemini-flash-latest'), 
      system: "Tu es Mindoguesito, un expert passionné de Ouidah (Bénin). Tes réponses sont courtes, chaleureuses et précises.",
      messages,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (e) => (e instanceof Error ? e.message : String(e))
    });

  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }
}