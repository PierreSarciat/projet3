

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
        loadGallery(data)
    })
    .catch(err => console.log("Erreur chargement projets :", err));



/***************Chargement et affichage direct des projets dans la fenêtre modale*********************************** */


fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
        console.log("Données reçues :", data);
        /*loadGalleryModal(data)*/
        let display = "";

        for (let figure of data) {
            display += `
        <figure data-id="${figure.id}" data-category-id="${figure.categoryId}">
            <img src="${figure.imageUrl}" alt="${figure.title}"><i class="fa-solid fa-trash-can delete-icon"></i>
            
        </figure>`;
        }
        console.log(display);
        document.querySelector(".galleryModal").innerHTML = display;
        loadGallery(data)
    })
    .catch(err => console.log("Erreur chargement projets :", err));



/**************************Suppression des projets fenêtre modale******************************** */





document.querySelector(".galleryModal").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
        const figure = e.target.closest("figure");
        const id = figure.dataset.id;
        console.log("ID :", id);
        deleteWork(id);
    }
});


/*********suppression travaux********** */

function deleteWork(id) {
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression");
            }
            console.log("Travail supprimé avec succès !");
            loadGallery(data);
            document.querySelector(`figure[data-id="${id}"]`).remove();
        })
        .catch(err => console.error(err));
}



/**********************Rajout de travaux*********************** */

/*document.getElementById("uploadForm").addEventListener("submit", function(e) {
  e.preventDefault(); // empêcher le rechargement de la page

  // Préparer les données du formulaire
  const formData = new FormData();
  formData.append("image", document.getElementById("photo").files[0]); // fichier image
  formData.append("title", document.getElementById("titre").value);    // titre
  formData.append("category", document.getElementById("categorie").value); // catégorie

  // Envoyer à l’API
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}` // si ton API nécessite un token
      // ⚠️ PAS de Content-Type ici → fetch le gère tout seul avec FormData
    },
    body: formData
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("Échec de l’upload");
    }
    return res.json(); // API renvoie l’objet créé
  })
  .then(newWork => {
    console.log("Travail ajouté :", newWork);

    // Mise à jour de la galerie directement
    const gallery = document.querySelector(".gallery");
    const figure = document.createElement("figure");
    figure.setAttribute("data-id", newWork.id);
    figure.innerHTML = `
      <img src="${newWork.imageUrl}" alt="${newWork.title}">
      <figcaption>${newWork.title}</figcaption>
    `;
    gallery.appendChild(figure);
  })
  .catch(err => console.error("Erreur :", err));
});*/

document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault(); // empêcher le rechargement de la page

    // Préparer les données du formulaire
    const formData = new FormData();
    formData.append("image", document.getElementById("photo").files[0]); // fichier image
    formData.append("title", document.getElementById("titre").value);    // titre
    formData.append("category", document.getElementById("categorie").value); // catégorie

    // Envoyer à l’API
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}` // token si API protégée
        },
        body: formData
    })
        .then(res => {
            if (!res.ok) {
                throw new Error("Échec de l’upload");
            }
            return res.json(); // L’API renvoie l’objet créé
        })
        .then(newWork => {
            console.log("Travail ajouté :", newWork);

            // 🔹 Mise à jour de la galerie principale
            const gallery = document.querySelector(".gallery");
            const figure = document.createElement("figure");
            figure.setAttribute("data-id", newWork.id);
            figure.innerHTML = `
      <img src="${newWork.imageUrl}" alt="${newWork.title}">
      <figcaption>${newWork.title}</figcaption>
    `;
            gallery.appendChild(figure);

            // 🔹 Mise à jour de la galerie modale (en rechargeant depuis l’API)
            loadGalleryModal();

            // 🔹 (Optionnel) Réinitialiser le formulaire après ajout
            document.getElementById("uploadForm").reset();
        })
        .catch(err => console.error("Erreur :", err));
});


