let nombre = "Sonia"

let obj = {
    nombre: "Pepito",
    saludo: function(){
        let nom = this.nombre
        let saludo_fn = function(){
            console.log("Hola " + nom);
        };
        saludo_fn();
    }
};

obj.saludo();