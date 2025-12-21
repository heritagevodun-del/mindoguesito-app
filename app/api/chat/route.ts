import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Vérification Clé API
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
    if (!apiKey) {
      return new Response(
        "ERREUR CRITIQUE : Aucune clé API trouvée sur le serveur.",
        { status: 500 }
      );
    }

    // 2. Génération de texte (Mode Bloquant pour Debug)
    const { text } = await generateText({
      model: google("gemini-1.5-flash"),
      system: `Tu es Mindoguesito. Réponds brièvement.`,
      messages,
    });

    // 3. Réponse directe
    return new Response(text);
  } catch (error: unknown) {
    // CORRECTION EXPERTE ICI : On remplace 'any' par 'unknown' et on sécurise la lecture du message
    console.error("ERREUR GOOGLE:", error);

    const errorMessage = error instanceof Error ? error.message : String(error);

    return new Response(`ERREUR TECHNIQUE : ${errorMessage}`, { status: 500 });
  }
}
