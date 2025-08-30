/**********Chargement des catégories,création des boutons et injection des catégories dans index.html et boîte modale ***************************************/


fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        let display = '<li class="active"><button class="bouton" data-id="0">Tous</button></li>';
        for (let filtre of data) {
            display += `<li><button class="bouton" data-id="${filtre.id}">${filtre.name}</button></li>`;
        }
        document.querySelector(".filtre ul").innerHTML = display;


        const boutons = document.querySelectorAll(".bouton");    //Ajout d' un écouteur d' évènement click
        boutons.forEach(bouton => {
            bouton.addEventListener("click", () => {
                const categoryId = bouton.dataset.id;
                console.log("Filtrage pour categoryId :", categoryId);


                const figures = document.querySelectorAll(".gallery figure");   //Filtrage dynamique
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


        const selectCategorie = document.getElementById("categorie");



        //injection des catégories de l' api dans la fenêtre modale

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
        if (token) {
            loadGalleryModal(data)
        }
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




/**********************Rajout de travaux*********************** */


document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    //données du formulaire

    const formData = new FormData();
    formData.append("image", document.getElementById("photo").files[0]); // fichier image
    formData.append("title", document.getElementById("titre").value);    // titre
    formData.append("category", document.getElementById("categorie").value); // catégorie
    const dropzoneBefore = document.getElementById("dropzoneBefore")



    fetch("http://localhost:5678/api/works", {    //Envoyer à l’API
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
            return res.json();
        })
        .then(newWork => {
            console.log("Travail ajouté :", newWork);
            return fetch("http://localhost:5678/api/works")  // Recharger la galerie depuis l’API
                .then(res => res.json())
                .then(data => {
                    loadGallery(data);
                    loadGalleryModal(data);
                });
        })
        .then(() => {   //Réinitialiser le formulaire, le preview et le bouton valider après ajout          
            modaleInit()
            validerModal2.classList.remove("active");
        })
        .catch(err => console.error("Erreur :", err));
});


/********************preview*************************************** */


const inputPhoto = document.getElementById("photo");
const previewImage = document.getElementById("previewImage");

inputPhoto.addEventListener("change", () => {
    const file = inputPhoto.files[0];
    if (file) {
        const objectURL = URL.createObjectURL(file);
        previewImage.src = objectURL;
        previewImage.style.display = "block";
        dropzoneBefore.style.display = "none";
    } else {
        previewImage.style.display = "none";
    }
});