fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        let display = '<li><button class="bouton" data-id="0">Tous</button></li>';
        for (let filtre of data) {
            display += `            
        <li><button class="bouton" data-id="${filtre.id}">${filtre.name}</button></li>`
        }

        document.querySelector(".filtre ul").innerHTML = display;

        const boutons = document.querySelectorAll(".bouton");

        boutons.forEach(bouton => {

            bouton.addEventListener("click", () => {
                const categoryId = bouton.dataset.id;
                console.log("Bouton trier ok");
                console.log(categoryId);


            });
        });
    })


    .catch(err => console.log(err));


    fetch("http://localhost:5678/api/works")
    .then(res => res.json())
    .then(data => {
        let display = "";
        for (let figure of data) {

            display += ` 
        <figure>
        <img src="${figure.imageUrl}" alt="${figure.title}">
			<figcaption>${figure.title
                }</figcaption>
</figure>
   `;
        }

        console.log(display)
        document.querySelector(".gallery").innerHTML = display;
    })

    .catch(err => console.log(err));





