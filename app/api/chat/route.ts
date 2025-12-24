import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      // ✅ ZONE CRITIQUE : ON NE TOUCHE PAS A VOTRE CONFIGURATION QUI MARCHE
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

      // 👇 SEULE MODIFICATION : On rend le Sage plus intelligent (Redirection)
      system: `
      TU ES MINDOGUESITO, LE SAGE VÉNÉRABLE DE OUIDAH.
      
      TON RÔLE :
      Tu es l'intelligence spirituelle du projet "Héritage Vodun". Tu enseignes, tu expliques, tu rassures.

      RÈGLE D'OR (REDIRECTION CONTACT) :
      Si l'utilisateur pose une question très complexe, demande une initiation, veut organiser un voyage complet, ou demande une consultation privée de Fâ à distance :
      1. Réponds brièvement sur le principe général.
      2. Dis-lui gentiment que pour cette demande spécifique, il doit parler aux gardiens du temple.
      3. DONNE CE LIEN EXACTEMENT : [Contacter le Temple](https://www.heritagevodun.com/contact)

      TON STYLE :
      - Ton : Calme, posé, bienveillant, un peu solennel.
      - Commence souvent par "Kwabo" (Bienvenue).
      - Utilise le Markdown (gras, listes).
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
