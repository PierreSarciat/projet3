document.addEventListener("DOMContentLoaded", () => {
    let Bouton = document.querySelector("button");

    Bouton.addEventListener("click", (event) => {
        event.preventDefault(); 

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        console.log("E-mail :", email);
        console.log("Mot de passe :", password);
    });
});


