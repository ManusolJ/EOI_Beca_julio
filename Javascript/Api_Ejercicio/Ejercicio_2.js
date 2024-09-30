const request = new Request("http://169.254.123.192:3000/clientes");

fetch(request)
    .then(response => response.json())
    .then(data => {

        console.log(data);

        let tabla = `<table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Direcciones</th>
            </tr>
        </thead>
        <tbody>`

        let finTabla = `</tbody>
        </table>`

        let filas = '';

        data[0].arrayUsuarios.forEach(user => {

            filas += `
            <tr>
                <td>${user.nombre}</td>
                <td>${user.apellidos}</td>
                <td>DIRECCION</td>
            </tr>`

        });

        tabla += filas + finTabla;
        document.getElementById("resultado").innerHTML = tabla;
    })
