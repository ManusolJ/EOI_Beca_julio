let pieza = {
    peso:20,
}   

let pieza2 = {
    peso:'20'
}

console.log(pieza.peso == pieza2.peso)

console.log(pieza.peso === pieza2.peso)

let x = (pieza.peso === '20') ? pieza.peso + pieza2.peso : pieza.peso * pieza2.peso;

console.log(x)