


const modal = document.getElementById("myModal")
const openBtn = document.getElementById("openModal")
const closeBtn = document.getElementById("closeModal")

// Ouvrir
openBtn.addEventListener("click", () => {
  modal.style.display = "flex"
  modal.setAttribute("aria-hidden", "false")
})

// Fermer en cliquant sur le X
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
