function create() {
    let x = document.createElement("p");
    x.textContent = "Este texto esta añadido dinamicamente";
    x.setAttribute("id", "parrafo1");


    document.getElementById("test").appendChild(x);
}