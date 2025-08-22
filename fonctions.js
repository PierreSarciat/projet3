

/*******************************Chargement et affichage direct des galeries*******************/



function loadGallery(data) {

    let display = "";
    for (let figure of data) {
        display += `
       <figure data-id="${figure.id}" data-category-id="${figure.categoryId}">
            <img src="${figure.imageUrl}" alt="${figure.title}">
            <figcaption>${figure.title}</figcaption>
        </figure>`;
    }
    document.querySelector(".gallery").innerHTML = display;

}


/*****************************Chargement et affichage de la galerie dans la fenêtre modale************ */


function loadGalleryModal() {
  fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
      // on vide la galerie modale avant de la remplir
      const galleryModal = document.querySelector(".galleryModal");
      galleryModal.innerHTML = "";

      // on boucle sur chaque projet renvoyé par l'API
      data.forEach(work => {
        const figure = document.createElement("figure");
        figure.dataset.id = work.id;

        figure.innerHTML = `
          <img src="${work.imageUrl}" alt="${work.title}">
          <i class="fa-solid fa-trash-can delete-icon"></i>
        `;

        galleryModal.appendChild(figure);
      });

      // 🎯 maintenant que les icônes existent dans le DOM, on leur met les écouteurs
      const deleteIcons = galleryModal.querySelectorAll(".delete-icon");
      deleteIcons.forEach(icon => {
        icon.addEventListener("click", (e) => {
          const figure = e.target.closest("figure");
          const id = figure.dataset.id;
          console.log("ID à supprimer :", id);

          deleteWork(id); // appelle ta fonction de suppression
        });
      });
    })
    .catch(err => console.error("Erreur chargement projets :", err));
}




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



