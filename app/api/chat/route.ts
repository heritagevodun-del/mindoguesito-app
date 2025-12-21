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

    // 2. Génération de texte avec le NOM DE MODÈLE PRÉCIS (-001)
    // C'est ce qui corrige l'erreur "Model not found"
    const { text } = await generateText({
      model: google("gemini-1.5-flash-001"),
      system: `Tu es Mindoguesito, le Sage de Ouidah. Réponds brièvement et chaleureusement.`,
      messages,
    });

    // 3. Réponse directe
    return new Response(text);
  } catch (error: unknown) {
    console.error("ERREUR GOOGLE:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return new Response(`ERREUR TECHNIQUE : ${errorMessage}`, { status: 500 });
  }
}
