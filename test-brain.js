require('dotenv').config({ path: '.env.local' });

async function testBrain() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  const modelName = "gemini-2.0-flash"; // Le modèle qu'on veut tester

  if (!apiKey) { console.error('❌ CLÉ MANQUANTE dans .env.local'); return; }

  console.log('🧠 TENTATIVE DE CONNEXION AU CERVEAU (' + modelName + ')...');
  console.log('---------------------------------------------------------');

  try {
    // On attaque directement l'API Google sans passer par la librairie AI SDK
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/' + modelName + ':generateContent?key=' + apiKey;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Bonjour, es-tu là ?" }] }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.log('❌ ÉCHEC CRITIQUE (Code ' + response.status + ')');
      console.log('👇 VOICI L\'ERREUR EXACTE RENVOYÉE PAR GOOGLE :');
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log('✅ SUCCÈS ! LE SAGE A RÉPONDU :');
      // On essaie de lire la réponse
      if (data.candidates && data.candidates[0].content) {
         console.log('💬 "' + data.candidates[0].content.parts[0].text + '"');
         console.log('---------------------------------------------------------');
         console.log('🎉 CONCLUSION : Le modèle MARCHE. Le bug est dans le code Next.js.');
      } else {
         console.log('⚠️ Réponse vide (bizarre, mais pas une erreur 500).');
         console.log(JSON.stringify(data, null, 2));
      }
    }

  } catch (error) {
    console.error('❌ ERREUR RÉSEAU/SCRIPT :', error);
  }
}

testBrain();
