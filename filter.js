fetch("http://localhost:5678/api/categories")
    .then(res => res.json())
    .then(data => {
        let display = "<li>Tous</li>";
        for (let filtre of data) {
            display += `            
        <li>${filtre.name}</li>`
        }
        console.log(display)
        document.querySelector(".filtre ul").innerHTML = display;
    })

    .catch(err => console.log(err));


