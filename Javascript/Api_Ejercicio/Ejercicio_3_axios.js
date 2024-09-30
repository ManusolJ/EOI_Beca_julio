const headers = {
    'Content-Type': 'application/json',
    'Acess-Control-Allow-Origin': '*'
};

const urlUsers = "http://169.254.123.192:3000/clientes";

axios.get(urlUsers, { headers })
    .then((respuestaUsuarios) => {
        let user;
        user = respuestaUsuarios.data[0].arrayUsuarios[0];
        writeData(user);
    })


function writeData(param) {
    let direccion = '';
    let cpostal = '';

    param.direcciones.forEach(element => {
        direccion += element.direccion + " ";
        cpostal += element.cpostal + " ";
    });

    console.log(direccion, cpostal);

    document.getElementById("titulo").innerHTML = `${param.nombre} ${param.apellidos}`;
    document.getElementById("texto").innerHTML = `${direccion} ${cpostal}`;
}