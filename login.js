
const affichageIcone = document.getElementById("icone")
const affichageFiltre = document.querySelector(".filtre")
const logInOut = document.getElementById("logInOut")

const token = localStorage.getItem("token");
const adminBtn = document.getElementById("admin-btn");

function changeInOut(e) {
    e.preventDefault()
    logInOut.textContent = "login";
    logInOut.href = "formulaire.html"
    localStorage.removeItem("token");
    affichageIcone.style.display = "none";
    affichageFiltre.style.display = "block";
    logInOut.removeEventListener("click", changeInOut);
}

if (token) {
    affichageIcone.style.display = "flex";
    affichageFiltre.style.display = "none";
    logInOut.textContent = "logout";
    logInOut.href = "";
    logInOut.addEventListener("click", changeInOut);
}





