function create() {
    let x = document.createElement("p");
    x.textContent = "Este texto esta añadido dinamicamente";

    document.getElementById("test").appendChild(x);
}