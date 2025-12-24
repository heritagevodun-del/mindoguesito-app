/* eslint-disable */
// 👆 La ligne ci-dessus désactive les alertes rouges pour ce fichier spécifique.

const { config } = require("dotenv");
config({ path: ".env.local" });

async function checkModels() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    console.error("❌ ERREUR : Clé API introuvable dans .env.local");
    return;
  }

  console.log("📡 Scan des modèles Google en cours...");

  try {
    // On interroge Google directement
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    const data = await response.json();

    if (data.error) {
      console.error("❌ ERREUR GOOGLE :", data.error.message);
      return;
    }

    console.log("\n✅ LISTE OFFICIELLE DES MODÈLES DISPONIBLES :");
    console.log("------------------------------------------------");

    // On ne garde que les modèles qui savent discuter (generateContent)
    const chatModels = data.models.filter((m) =>
      m.supportedGenerationMethods.includes("generateContent")
    );

    chatModels.forEach((model) => {
      const cleanName = model.name.replace("models/", "");
      console.log(`🔹 ${cleanName}`);

      // On met en évidence celui qu'on cherche
      if (cleanName === "gemini-1.5-flash") {
        console.log("   ✨ CIBLE TROUVÉE : C'est celui-là qu'il nous faut !");
      }
    });

    console.log("------------------------------------------------");
  } catch (error) {
    console.error("❌ Erreur réseau :", error.message);
  }
}

checkModels();
