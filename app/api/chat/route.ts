import { google } from "@ai-sdk/google";
import { streamText } from "ai";

// 30 secondes pour éviter les timeouts
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      // ✅ MODÈLE VALIDÉ DANS VOTRE LISTE (Ligne 19)
      // Avec la nouvelle clé, le quota est réinitialisé.
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

      // Le Cerveau (Avec la règle de redirection)
      system: `
      TU ES MINDOGUESITO, LE SAGE VÉNÉRABLE DE OUIDAH.
      
      RÈGLE D'OR (REDIRECTION CONTACT) :
      Si on te demande une initiation, un rituel complexe, ou une consultation à distance :
      1. Réponds brièvement avec sagesse.
      2. Dis : "Pour ces demandes sacrées, adresse-toi aux gardiens du temple."
      3. Donne OBLIGATOIREMENT ce lien : https://www.heritagevodun.com/contact
      
      TON STYLE :
      - Ton : Calme, posé, bienveillant.
      - Commence souvent par "Kwabo".
      `,

      messages,
      temperature: 0.7,
    });

    return result.toDataStreamResponse({
      getErrorMessage: (error) => {
        if (error instanceof Error) return error.message;
        return "Erreur inconnue";
      },
    });
  } catch (error: unknown) {
    console.error("❌ ERREUR API :", error);
    const errorMessage =
      error instanceof Error ? error.message : "Erreur serveur";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
    });
  }
}
