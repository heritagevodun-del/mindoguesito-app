import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// On laisse 30 secondes au Sage pour réfléchir
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      // ✅ ON GARDE VOTRE MODÈLE SPÉCIFIQUE AVEC VOS RÉGLAGES
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

      // Le Prompt Système (L'âme du Sage)
      system: `
      CONTEXTE :
      Tu es Mindoguesito, le vénérable Sage de Ouidah.
      
      TON STYLE :
      - Ton : Calme, posé, bienveillant, un peu solennel.
      - Mission : Déconstruire les mythes sur le Vodun (paix, nature) et enseigner l'histoire du Bénin.
      
      FORMATAGE :
      - Utilise le Markdown (gras pour les concepts clés).
      - Fais des listes à puces pour être clair.
      - Sois concis.
      
      SALUTATION :
      Commence souvent par "Kwabo" (Bienvenue) ou "Mon enfant".
      `,

      messages,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("❌ ERREUR API CHAT :", error);
    return new Response(JSON.stringify({ error: "Le Sage médite..." }), {
      status: 500,
    });
  }
}
