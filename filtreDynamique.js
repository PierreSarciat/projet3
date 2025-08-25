





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

        /***********************injection des catégories de l' api dans la fenêtre modale************************************* */


        const selectCategorie = document.getElementById("categorie");
        data.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.id;
            option.textContent = cat.name;
            selectCategorie.appendChild(option);
        });
    })
    .catch(err => console.log("Erreur chargement filtres :", err));
/* })

 .catch(err => console.error("Erreur chargement catégories :", err));*/




/*******************************Chargement et affichage direct des projets  dans toutes les galeries avant de filtrer*******************/


fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
        console.log("Données reçues :", data);
        loadGallery(data)
        loadGalleryModal(data)
    })
    .catch(err => console.log("Erreur chargement projets :", err));






/**************************Suppression des projets fenêtre modale******************************** */





document.querySelector(".galleryModal").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-icon")) {
        const figure = e.target.closest("figure");
        const id = figure.dataset.id;
        console.log("ID :", id);
        deleteWork(id, figure);
    }
});

/********************preview*************************************** */

// Sélection des éléments
const inputPhoto = document.getElementById("photo");
const previewImage = document.getElementById("previewImage");

// Quand on choisit un fichier
inputPhoto.addEventListener("change", () => {
    const file = inputPhoto.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        previewImage.src = objectURL;
        previewImage.style.display = "block";
    } else {
        previewImage.style.display = "none";
    }
});



/**********************Rajout de travaux*********************** */




document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    /*Préparer les données du formulaire*/

    const formData = new FormData();
    formData.append("image", document.getElementById("photo").files[0]); // fichier image
    formData.append("title", document.getElementById("titre").value);    // titre
    formData.append("category", document.getElementById("categorie").value); // catégorie




    /*Envoyer à l’API*/

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
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

            // ✅ Recharger la galerie depuis l’API

            return fetch("http://localhost:5678/api/works")
                .then(res => res.json())
                .then(data => {
                    loadGallery(data);
                    loadGalleryModal(data);
                });
        })
        .then(() => {

            /*Réinitialiser le formulaire et le preview après ajout*/

            document.getElementById("uploadForm").reset();
            previewImage.style.display = "none";
        })
        .catch(err => console.error("Erreur :", err));
});


