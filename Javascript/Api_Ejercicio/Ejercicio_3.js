const request = new Request("http://169.254.123.192:3000/clientes");

fetch(request)
    .then(response => response.json())
    .then(data => {
        let x = data[0].arrayUsuarios[0];
        console.log(x.direcciones);
        writeData(x);
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
