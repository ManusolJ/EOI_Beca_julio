const headers = {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*'
};

const urlUsers = "http://169.254.123.192:3000/usuarios";

axios.get(urlUsers, { headers })
    .then((respuestaUsuarios) => {
        let users;
        users = respuestaUsuarios.data;

        write(users);
    })

function write(param) {

    let tabla = `<table>
        <thead>
            <tr>
                <th>Nombre usuario</th>
            </tr>
        </thead>
        <tbody>`;

    let finTabla = `</tbody>
        </table>`;

    let filas = '';

    param.forEach(user => {

        filas += `
            <tr>
                <td>${user.nombre}</td>
            </tr>`

    });

    tabla += filas + finTabla;
    document.getElementById("resultado").innerHTML = tabla;
}