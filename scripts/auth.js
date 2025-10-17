import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB52N1JBgWdWoxiZfobH0NxcRaNh6N3-Y8",
  authDomain: "estacionamento-pwa12.firebaseapp.com",
  projectId: "estacionamento-pwa12",
  storageBucket: "estacionamento-pwa12.firebasestorage.app",
  messagingSenderId: "1036357381383",
  appId: "1:1036357381383:web:3aebfc0703e6adb1cb29a2"
};


const url = './login.json'
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



$.post(url,{
  
  data:JSON.stringify()
}
  ,callback);




const botao_registro = document.getElementById('botao_registro');
if (botao_registro) {
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
      alert("Usuário criado com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar-se:", error.code, error.message);
      alert("Erro ao registrar: " + error.message);
    }
  });
}

const botao_login = document.getElementById('botao-login');
if (botao_login) {
  botao_login.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log("Usuário logado:", userCredential.user.uid);
      $.
        window.location.href = "../index.html";
    } catch (error) {
      console.error("Erro ao logar:", error.code, error.message);
      alert("Erro ao logar, verifique suas credenciais!");
    }
  });
}

async function getCities() {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  return citySnapshot.docs.map(doc => doc.data());
}