


const modal = document.getElementById("myModal")
const openBtn = document.getElementById("openModal")
const closeBtn = document.getElementById("closeModal")

const modal2 = document.getElementById("myModal2")
const openModal2 = document.getElementById("ajouterPhoto")
const closeBtn2 = document.getElementById("closeModal2")
const returnModal = document.getElementById("returnModal")

/***********boîte modale 1 *********************** */

// Ouvrir
openBtn.addEventListener("click", () => {
  modal.style.display = "flex"
  modal.setAttribute("aria-hidden", "false")
})

// Fermer 

closeBtn.addEventListener("click", () => {
  modal.style.display = "none"
  modal.setAttribute("aria-hidden", "true")

})

// Fermer en cliquant sur le fond
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
  }
})

/*******************  boite modale 2 *****************************/


// ouvrir 

openModal2.addEventListener("click", () => {
  modal2.style.display = "flex"
  modal2.setAttribute("aria-hidden", "false")
  modal.style.display = "none"
  modal.setAttribute("aria-hidden", "true ")
})

//  fermer 

closeBtn2.addEventListener("click", () => {
  modal2.style.display = "none"
  modal2.setAttribute("aria-hidden", "true")
  modaleInit()
})

// fermer en cliquant à l' exterieur

modal2.addEventListener("click", (e) => {
  if (e.target === modal2) {
    modal2.style.display = "none"
    modal2.setAttribute("aria-hidden", "true")
    modaleInit()
  }

})


//  retour boîte modale début

returnModal.addEventListener("click", () => {
  modal2.style.display = "none"
  modal2.setAttribute("aria-hidden", "true")
  modal.style.display = "flex"
  modal.setAttribute("aria-hidden", "false")
  modaleInit()
})







