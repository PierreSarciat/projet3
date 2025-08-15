/*let modal = null

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute("href"))
    modal.style.display = null
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}


document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)

})


window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    };

})*/




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