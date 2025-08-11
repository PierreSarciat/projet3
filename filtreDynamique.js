

/**********Chargement des catégories,création des boutons et injection dans HTML***************************************/


fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        let display = '<li><button class="bouton" data-id="0">Tous</button></li>';
        for (let filtre of data) {
            display += `<li><button class="bouton" data-id="${filtre.id}">${filtre.name}</button></li>`;
        }

        document.querySelector(".filtre ul").innerHTML = display;


/********************Ajout d' un écouteur d' évènement click****************************************************** */

        const boutons = document.querySelectorAll(".bouton");

        boutons.forEach(bouton => {
            bouton.addEventListener("click", () => {
                const categoryId = bouton.dataset.id; 
                console.log("Filtrage pour categoryId :", categoryId);



/************************Filtrage dynamique****************************************************************** */

                const figures = document.querySelectorAll(".gallery figure");

                figures.forEach(figure => {
                    const projetCategoryId = figure.dataset.categoryId; 

                    if (categoryId === "0" || projetCategoryId === categoryId) {
                        figure.style.display = "block";
                    } else {
                        figure.style.display = "none";
                    }
                });
            });
        });
    })
    .catch(err => console.log("Erreur chargement filtres :", err));

