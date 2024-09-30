let modalEliminar = new bootstrap.Modal(document.getElementById("delete_modal"));
const headers = {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*'
};

const urlUsers = "http://localhost:3000/usuarios";


axios.get(urlUsers, { headers })
    .then((respuesta) => {
        let info = respuesta.data;
        writeData(info);
    })

function writeData(info) {
    let table_content = '';

    info.forEach(element => {
        table_content += `<tr>
            <th scope="row"><a href="edit.html?id=${element.id}">${element.id}</a></th>
            <td>${element.nombre}</td>
            <td>${element.apellidos}</td>
            <td>${element.email}</td>
            <td><button class="btn btn-danger" onclick="deleteUser('${element.id}');">Delete</button></td>
            </tr>`;
    });

    document.getElementById("tarjet_body").innerHTML = table_content;
}

function deleteUser(param) {
    modalEliminar.show();
    document.getElementById("test").onclick = function () {
        axios.delete(`${urlUsers}/${param}`);
        modalEliminar.hide();
        window.location.reload();
    };
    document.getElementById("test2").onclick = function () {
        modalEliminar.hide();
    };
}