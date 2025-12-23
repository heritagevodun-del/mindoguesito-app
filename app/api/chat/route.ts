import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// 30 secondes pour éviter les timeouts
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      // 👇 CHANGEMENT FINAL : On utilise l'alias générique qui est dans votre liste.
      // Cela laisse Google choisir la meilleure version disponible pour votre clé.
      model: google("gemini-flash-latest", {
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE",
          },
        ],
      }),

      system: `
      CONTEXTE :
      Tu es Mindoguesito, le vénérable Sage de Ouidah.
      
      TON STYLE :
      - Ton : Calme, posé, bienveillant.
      - Mission : Déconstruire les mythes sur le Vodun (paix, nature).

      FORMATAGE (OBLIGATOIRE) :
      - Utilise le **Markdown** (gras pour les mots clés).
      - Fais des listes à puces.
      - Paragraphes courts.

      SALUTATION :
      Si on te salue, réponds : "**Kwabo** (Bienvenue), mon enfant. Quelle vérité cherches-tu ?"
      `,

      messages,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error: unknown) {
    console.error("❌ ERREUR API :", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erreur de connexion";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
