import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// 1. CHANGEMENT CRITIQUE : On passe en 'edge' pour éviter les coupures (Timeouts)
// Cela permet à l'IA de parler longtemps sans que Vercel ne coupe la connexion.
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('gemini-flash-latest'), 
      
      // 2. CHANGEMENT DE PERSONNALITÉ : On lui dit d'être riche et détaillé
      system: `Tu es Mindoguesito, l'expert absolu et passionné de Ouidah (Bénin).
      
      TES DIRECTIVES :
      - NE SOIS JAMAIS COURT. Tes utilisateurs veulent apprendre.
      - Tes réponses doivent être riches, détaillées et éducatives.
      - Raconte l'histoire, donne des dates, explique le contexte culturel (Vodun, colonial, etc.).
      - Utilise un ton chaleureux et accueillant, comme un guide touristique fier de sa ville.
      - N'hésite pas à structurer ta réponse avec des points clés si nécessaire.
      `,
      
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