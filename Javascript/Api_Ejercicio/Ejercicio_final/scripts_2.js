const param = new URLSearchParams(window.location.search);

let usuario = null;

axios.get(`http://169.254.123.192:3000/usuarios/${param.get("id")}`)
    .then(response => {
        usuario = response.data;
        console.log(usuario);
        console.log(response.data);

        writeForm(usuario);
    })


function writeForm(usuario) {
    let form;

    let nombre = usuario.nombre;
    let apellidos = usuario.apellidos;
    let email = usuario.email;

    form = `<label for="nombre" class="form-label">Nombre</label>
    <input name="nombre" id="nombre" class="form-control" value="${nombre}"></input>
    <label for="apellidos" class"form-label">Apellidos</label>
    <input name="apellidos" id="apellidos" class="form-control" value="${apellidos}"></input>
    <label for="email" class="form-label">Email</label>
    <input name="email" id="email" class="form-control" value="${email}"></input>`;

    document.getElementById("form_body").innerHTML = form;
}

function updateData() {

    let form_data = document.forms.user_form;

    console.log(form_data);


    let new_user_data = {
        nombre: form_data.nombre.value,
        apellidos: form_data.apellidos.value,
        email: form_data.email.value
    };

    console.log(new_user_data);

    axios.put(`http://169.254.123.192:3000/usuarios/${param.get("id")}`, new_user_data)
        .then(window.location.assign('http://127.0.0.1:5500/Javascript/Api_Ejercicio/Ejercicio_final/index.html'));

}