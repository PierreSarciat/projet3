

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


/*******************************Chargement et affichage direct des projets  avant de commencer à filtrer*******************/


 fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
        let display = "";

        for (let figure of data) {
            display += `
        <figure data-id="${figure.id}" data-category-id="${figure.categoryId}">
            <img src="${figure.imageUrl}" alt="${figure.title}">
            <figcaption>${figure.title}</figcaption>
        </figure>`;
        }

        document.querySelector(".gallery").innerHTML = display;
    })
    .catch(err => console.log("Erreur chargement projets :", err));



    /***************Chargement et affichage direct des projets dans la fenêtre modale*********************************** */


     fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
        let display ="";

        for (let figure of data) {
            display += `
        <figure data-id="${figure.id}" data-category-id="${figure.categoryId}">
            <img src="${figure.imageUrl}" alt="${figure.title}"><i class="fa-solid fa-trash-can delete-icon"></i>
            
        </figure>`;
        }
console.log(display);
        document.querySelector(".galleryModal").innerHTML = display;
    })
    .catch(err => console.log("Erreur chargement projets :", err));



    /**************************Suppression des projets fenêtre modale******************************** */


    /***ajout ecouteur sur icône corbeille*/


/*const deleteIcons = document.querySelectorAll(".delete-icon");
deleteIcons.forEach(icon => {
  icon.addEventListener("click", (e) => {
    const figure = e.target.closest("figure");
    const id = figure.dataset.id;
    console.log("Clique détecté sur la corbeille de l’ID :", id);
  });

  console.log("Écouteur ajouté sur une icône corbeille :", icon);
});*/

document.querySelector(".galleryModal").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    const figure = e.target.closest("figure");
    const id = figure.dataset.id;
    console.log("Icône cliquée via délégation, ID :", id);
  }
});
    



