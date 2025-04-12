// Crea un file separato upload-nasoni.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, writeBatch, doc } from "firebase/firestore";
import fs from 'fs';

const firebaseConfig = {
    apiKey: "AIzaSyD23PjywD7kOgA2zLbH-tDvz1XAqKp8AgM",
    authDomain: "nasone-project.firebaseapp.com",
    projectId: "nasone-project",
    storageBucket: "nasone-project.appspot.com",
    messagingSenderId: "841489834300",
    appId: "1:841489834300:web:d6ada8d7ab627f559a3e39"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Leggi il file nasoni.json
const nasoni = JSON.parse(fs.readFileSync('"C:/Users/nicco/Desktop/nasoni.json"', 'utf8'));

async function uploadNasoni() {
  // Usa batch write per efficienza
  const batch = writeBatch(db);
  const nasoniRef = collection(db, "nasoni");
  
  nasoni.forEach((nasone) => {
    const docRef = doc(nasoniRef, nasone.id.toString());
    batch.set(docRef, {
      nome: nasone.nome,
      lat: nasone.lat,
      lon: nasone.lon
    });
  });
  
  await batch.commit();
  console.log(`Caricati ${nasoni.length} nasoni su Firestore`);
}

uploadNasoni().catch(console.error);