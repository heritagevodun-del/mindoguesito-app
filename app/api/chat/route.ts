import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// On laisse 30s au modèle Flash, c'est largement suffisant
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Vérification de sécurité CRUCIALE
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
        return new Response("ERREUR FATALE : La clé API manque dans les réglages Vercel.", { status: 500 });
    }

    const result = streamText({
      model: google('gemini-1.5-flash'),
      system: `Tu es Mindoguesito, le Sage vénérable de Ouidah (Bénin).
      Ton rôle est d'éduquer le monde sur la beauté et la paix du Vodun.
      Si on te salue, sois bref et accueillant.
      Si on te pose une question, sois un conteur passionnant.`,
      messages,
    });

    return result.toDataStreamResponse();
    
  } catch (error) {
    // CORRECTION : On log l'erreur pour satisfaire le linter et pour le debug
    console.error("Erreur API:", error);
    return new Response(JSON.stringify({ error: "Le Sage est indisponible." }), { status: 500 });
  }
}