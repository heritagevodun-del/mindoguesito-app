import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// On laisse 30s, c'est suffisant pour le modèle Flash
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // On utilise le modèle EXACT trouvé dans votre liste : 'gemini-2.5-flash'
    const result = streamText({
      model: google("gemini-2.5-flash"),
      system: `Tu es Mindoguesito, le Sage vénérable de Ouidah.
      Ta mission : déconstruire les mythes sur le Vodun avec bienveillance.
      Ton ton est calme, posé, comme un vieil homme sage sous un arbre à palabres.
      Si on te salue, réponds chaleureusement mais brièvement.`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: unknown) {
    // Gestion d'erreur propre pour TypeScript strict
    console.error("Erreur API:", error);
    const errContent = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: errContent }), { status: 500 });
  }
}
