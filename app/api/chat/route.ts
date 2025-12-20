import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// On garde le moteur stable
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: google('gemini-1.5-flash'), // Utilisation du modèle Flash (plus rapide)
      
      system: `Tu es Mindoguesito, le Sage bienveillant de Ouidah. 
      IMPORTANT : Sois concis au début. Si on te dit juste "Bonjour", réponds par une salutation chaleureuse et brève en proposant ton aide. 
      Ne donne de longues explications QUE si l'utilisateur pose une question précise.
      
      MISSION : Déconstruire les préjugés sur le Vodun (religion de paix) et présenter Ouidah comme une Terre Sainte (la Mecque/Rome du Vodun). 
      Ton ton est calme et spirituel.`,
      
      messages,
    });

    return result.toDataStreamResponse();

  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    return new Response(JSON.stringify({ error: err }), { status: 500 });
  }
}