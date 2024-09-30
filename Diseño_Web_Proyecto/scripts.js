const login_modal = new bootstrap.Modal(document.getElementById("login_modal"));

const signup_modal = new bootstrap.Modal(document.getElementById("signup_modal"));

const product_modal = new bootstrap.Modal(document.getElementById("product_modal"));

const headers = {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*'
};

const url_articles = "http://localhost:8080/marketplace/articulos";

const url_users = "http://localhost:8080/marketplace/usuarios"

function use_login_modal(param) {
    param == 1 ? login_modal.show() : login_modal.hide();
}

function use_signup_modal(param) {
    param == 1 ? signup_modal.show() : signup_modal.hide();
}

//TODO PENSAR EN LAS IMAGENES
function use_product_modal(product, image) {
    document.getElementById("product_title").innerHTML = product.nombre;
    document.getElementById("product_image").src = image;
    document.getElementById("product_price").innerHTML = product.precio;
    document.getElementById("product_amount").value = 1;
    product_modal.show();

    document.getElementById("product_amount").addEventListener('change', function () {
        if (document.getElementById("product_amount").value > product.stock) {
            document.getElementById("product_purchase").disabled = true;
        } else {
            document.getElementById("product_purchase").disabled = false;
        }
    });
}

function close_modal(modal) {
    modal.hide();
}

function get_product_list() {
    let articles;

    axios.get(url_articles, { headers })
        .then(response => {
            articles = response.data;
            set_product_list(articles);
        })
}

//TODO AÑADIR DESCRIPCION A BASE DE DATOS
function get_product(id, image) {
    let product;

    axios.get(`${url_articles}/${id}`)
        .then(response => {
            let info = response.data;

            product = {
                id: info.idArticulo,
                nombre: info.nombreArticulo,
                precio: info.precio,
                stock: info.stock
            };

            use_product_modal(product, image);
        })
}

function set_product_list(info) {

    let product_container = document.getElementById("product_container");

    let products = '';

    let image = '';

    info.forEach(product => {

        image = "https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 100);

        products += `<article class="col-2">
          <div class="card" value="${product.idArticulo}">
            <img src="${image}" alt="">
            <div class="card-body">
              <h5>${product.nombreArticulo}</h5>
              <p class="text-truncate mb-0">Breve descripcion</p>
              <p class="text-warning mb-0">${product.precio}€</p>
            </div>
            <div class="card-footer row gap-3 justify-content-center">
              <button class="btn btn-success col-5 btn-sm btn-sm">Buy now</button>
              <button class="btn btn-primary col-5 btn-sm btn-sm" onclick="get_product(${product.idArticulo},'${image}');">Details</button>
            </div>
          </div>
        </article>`
    });

    product_container.innerHTML = products;
}

//TODO CREAR TOKEN GENERATOR, HACER AUTH Y GENERAR TOKEN DE USUARIO
function login_user() {
    let new_div = `
    <button class="btn btn-dark btn-sm col"><i class="fa fa-shopping-basket"></i></button>
    <div class="col"><img
        src="https://png.pngitem.com/pimgs/s/623-6236346_person-icon-png-download-person-illustration-transparent-png.png"
        alt="" id="pfp" class="col rounded-circle">
    </div>`;

    let user_email = document.getElementById("email").value;
    let user_password = document.getElementById("password").value;


    axios.post(`${url_users}/login`, { nombreUsuario: user_email, password: user_password }, headers)
        .then(response => {
            // const token = response.data;
            // sessionStorage.setItem('token', token);
            // const base64Url = token.split('.')[1];
            // const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

            // const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) { //UTF8 - decodificación

            //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            // }).join(''));

            // const objectJWT = JSON.parse(jsonPayload);

            // console.log(objectJWT);
            // let tokenRecuperado = sessionStorage.getItem("token");
            // console.log(tokenRecuperado);

            if (response.data.nombreUsuario == user_email && response.data.password == user_password) {
                document.getElementById("user_container").innerHTML = '';
                document.getElementById("user_container").innerHTML = new_div;
                close_modal(login_modal);
            }
        })
}

//TODO CREAR USUARIO
function create_user(username, email, password) {
    axios.post(url_users, headers)
        .then(response => {
            close_modal(signup_modal);
            //login...  
        })
}

//TODO AÑADIR ARTICULO A LISTA, AÑADIR ARTICULO A CARRO DE LA COMPRA, REALIZAR PEDIDO, CERRAR CUENTA

function search_product() {

    let product_name = document.getElementById("search").value;

    let product_container = document.getElementById("product_container");

    axios.get(`${url_articles}/${product_name}/nombre`)
        .then(response => {
            articles = response.data;
            product_container.innerHTML = '';
            set_product_list(articles);
        })
}


document.getElementById("top_button").addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
})

Array.from(document.getElementsByClassName("bottom")).forEach(element => {
    element.addEventListener('click', function () {
        window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
    })
})