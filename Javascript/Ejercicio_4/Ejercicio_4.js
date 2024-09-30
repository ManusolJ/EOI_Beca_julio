let cadena1 = "CADENA1";

let cadena2;

console.log(typeof(cadena1));

console.log(typeof(cadena2));

if(typeof(cadena2) == "undefined"){
    console.log("SIN DEFINIR")
}

let Cliente = {
    nombre: "PEPITO",
    telefono: "656666666"
}

Cliente['direccion'] = "C/Salud, 21"

console.log(Cliente.nombre, Cliente.telefono, Cliente.direccion)