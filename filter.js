fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        let display = '<li><button class="bouton">Tous</button></li>';
        for (let filtre of data) {
            display += `            
        <li><button class="bouton">${filtre.name}</button></li>`
        }

        document.querySelector(".filtre ul").innerHTML = display;

        const boutons = document.querySelectorAll(".bouton");

        boutons.forEach(bouton => {

            bouton.addEventListener("click", () => {
                console.log("Bouton trier ok");

            });
        });
    })


            .catch(err => console.log(err));



    


