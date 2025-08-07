fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        let display = '<li><button class="bouton" data-id="0">Tous</button></li>';
        for (let filtre of data) {
            display += `<li><button class="bouton" data-id="${filtre.id}">${filtre.name}</button></li>`;
        }

        document.querySelector(".filtre ul").innerHTML = display;

        const boutons = document.querySelectorAll(".bouton");

        boutons.forEach(bouton => {
            bouton.addEventListener("click", () => {
                const categoryId = bouton.dataset.id; // type string
                console.log("Filtrage pour categoryId :", categoryId);

                const figures = document.querySelectorAll(".gallery figure");

                figures.forEach(figure => {
                    const projetCategoryId = figure.dataset.categoryId; // aussi string

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

// --- Chargement direct des projets ---


fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
        let display = "";

        for (let figure of data) {
            display += `
        <figure data-category-id="${figure.categoryId}">
            <img src="${figure.imageUrl}" alt="${figure.title}">
            <figcaption>${figure.title}</figcaption>
        </figure>`;
        }

        document.querySelector(".gallery").innerHTML = display;
    })
    .catch(err => console.log("Erreur chargement projets :", err));