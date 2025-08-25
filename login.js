
let bouton = document.querySelector("button");

bouton.addEventListener("click", (event) => {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    console.log("E-mail :", email);
    console.log("Mot de passe :", password);

    const dataConnexion = {
        email: email,
        password: password
    };

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataConnexion)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur réseau ou identifiants incorrects");
            }
            return response.json();
        })
        .then(data => {
            console.log("Connexion réussie :", data);
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error("Erreur lors de la connexion :", error);
            let erreurMessage = document.getElementById("message-erreur");
            erreurMessage.textContent = "E-mail ou mot de passe incorrect";


        });
});

