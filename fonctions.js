

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


function loadGalleryModal(data) {


  const galleryModal = document.querySelector(".galleryModal");

  let display = "";

  for (let figure of data) {
    display += `
        <figure data-id="${figure.id}" data-category-id="${figure.categoryId}">
            <img src="${figure.imageUrl}" alt="${figure.title}"><i class="fa-solid fa-trash-can delete-icon"></i>
            
        </figure>`;
  }
  /*console.log(display);*/
  document.querySelector(".galleryModal").innerHTML = display;

  // écouteurs sur icones
  const deleteIcons = galleryModal.querySelectorAll(".delete-icon");
  deleteIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      const figure = e.target.closest("figure");
      const id = figure.dataset.id;
      /*console.log("ID à supprimer :", id);*/


    });
  });
}


/*********suppression travaux********** */

function deleteWork(id, elem) {

  fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }
      /*console.log("Suppression ok");*/
      elem.remove();

      /***********Recharger la galerie depuis l’API****************************/

      return fetch("http://localhost:5678/api/works")
        .then(res => res.json())
        .then(data => {
          loadGallery(data);       // met à jour galerie principale
          loadGalleryModal(data);  // met à jour galerie modale
        });
    })
    .catch(err => console.error(err));
}


/***************changement style bouton valider modal2***************************/


document.addEventListener("DOMContentLoaded", () => {
  const photoModal2 = document.getElementById("photo");
  const titreModal2 = document.getElementById("titre");
  const categorieModal2 = document.getElementById("categorie");
  const validerModal2 = document.getElementById("validerModal2");

  function styleBtnValider() {
    if (
      photoModal2.files.length > 0 &&
      titreModal2.value.trim() !== "" &&
      categorieModal2.value.trim() !== ""
    ) {
      validerModal2.classList.add("active");
    } else {
      validerModal2.classList.remove("active");
    }
  }


  photoModal2.addEventListener("change", styleBtnValider);
  titreModal2.addEventListener("input", styleBtnValider);
  categorieModal2.addEventListener("change", styleBtnValider);


  styleBtnValider();
});


/****************réinitialisation de la modale 2********************** */

function modaleInit() {
  document.getElementById("uploadForm").reset();
  previewImage.style.display = "none";
  dropzoneBefore.style.display = "block";
}