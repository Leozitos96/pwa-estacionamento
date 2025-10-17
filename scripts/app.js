import { collection, doc, getDocs, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { db } from "./firebaseConfig.js";
import { auth } from "./firebaseConfig.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const botao_sair = document.getElementById("logoutBtn");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert('Precisa logar primeiro!');
      window.location.href = "/pwa-estacionamento/pages/login.html";
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const vagasContainer = document.querySelector(".vagas-grid");
  const novasVagas = await getDocs(collection(db, "vagas"));

  novasVagas.forEach((e) => {
    const vaga = e.data();
    const div = document.createElement("div");
    div.classList.add("vaga");
    div.textContent = `Vaga ${vaga.numero}`;
    div.dataset.numero = vaga.numero;
    div.dataset.status = vaga.status;

    atualizarCor(div);

    div.addEventListener("click", async () => {
      const novoStatus = vaga.status === "livre" ? "ocupada" : "livre";
      vaga.status = novoStatus;

      await setDoc(doc(db, "vagas", `vaga${vaga.numero}`), vaga);
      div.dataset.status = novoStatus;
      atualizarCor(div);
    });

    vagasContainer.appendChild(div);
  });
});

botao_sair.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = "/pwa-estacionamento/pages/login.html";
});

function atualizarCor(div) {
  const status = div.dataset.status;
  if (status === "livre") {
    div.style.backgroundColor = "#4CAF50";
    div.style.color = "#fff";
  } else if (status === "ocupada") {
    div.style.backgroundColor = "#f44336";
    div.style.color = "#fff";
  }
}
