export const maxDuration = 60;

// On définit la forme exacte d'un modèle Google pour satisfaire TypeScript
interface GoogleModel {
  name: string;
  supportedGenerationMethods?: string[];
}

export async function POST(req: Request) {
  try {
    // On utilise 'req' pour satisfaire le linter (log simple)
    console.log("Diagnostic demandé depuis :", req.url);

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey) {
      return new Response("ERREUR : Clé API manquante sur Vercel.", {
        status: 500,
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(`ERREUR D'ACCÈS GOOGLE : ${errorText}`, {
        status: 500,
      });
    }

    const data = (await response.json()) as { models: GoogleModel[] };

    // Maintenant TypeScript est content car on utilise l'interface GoogleModel au lieu de 'any'
    const availableModels = data.models
      .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
      .map((m) => m.name)
      .join("\n");

    return new Response(
      `✅ SUCCÈS ! Voici les modèles exacts disponibles pour votre clé :\n\n${availableModels}`
    );
  } catch (error: unknown) {
    const err = error instanceof Error ? error.message : String(error);
    return new Response(`ERREUR TECHNIQUE : ${err}`, { status: 500 });
  }
}
