require('dotenv').config({ path: '.env.local' });

async function listModels() {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) { console.error('❌ ERREUR : Clé API introuvable dans .env.local'); return; }
  
  console.log('🔍 Connexion à Google avec la clé : ' + apiKey.substring(0, 5) + '...');

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey);
    if (!response.ok) throw new Error('Erreur HTTP: ' + response.status);
    
    const data = await response.json();
    console.log('\n✅ VOICI LES MODÈLES QUE VOUS AVEZ LE DROIT D\'UTILISER :');
    console.log('===================================================');
    
    data.models
      .filter(m => m.name.includes('gemini'))
      .forEach(m => {
         console.log('🤖 ' + m.name.replace('models/', ''));
      });
      
  } catch (error) {
    console.error('❌ ÉCHEC DU TEST :', error.message);
  }
}
listModels();
