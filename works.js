
    


/*fetch("http://localhost:5678/api/works")
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

    .catch(err => console.log(err));*/


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


   




