import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, doc, setDoc, collection, getDocs } 
  from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB52N1JBgWdWoxiZfobH0NxcRaNh6N3-Y8",
  authDomain: "estacionamento-pwa12.firebaseapp.com",
  projectId: "estacionamento-pwa12",
  storageBucket: "estacionamento-pwa12.firebasestorage.app",
  messagingSenderId: "1036357381383",
  appId: "1:1036357381383:web:3aebfc0703e6adb1cb29a2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const botao_registro = document.getElementById('botao_registro');

botao_registro.addEventListener('click', async (e) => {
  e.preventDefault();

  const email_form = document.getElementById('registro_email').value;
  const senha_form = document.getElementById('registro_password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email_form, senha_form);
    const user = userCredential.user;

    await setDoc(doc(db, "usuarios", user.uid), {
      email: email_form,
      criadoEm: new Date()
    });
    console.log('Usuário criado no Firestore:', user.uid);
  } catch (error) {
    console.error("Erro ao registrar-se:", error.code, error.message);
  }
});

async function login(email, senha) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    console.log("Usuário logado:", userCredential.user.uid);
  } catch (error) {
    console.error("Erro ao logar:", error.code, error.message);
  }
}

async function getCities() {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  return citySnapshot.docs.map(doc => doc.data());
}
