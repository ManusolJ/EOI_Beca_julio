function validar() {
  let form = document.forms.data_form;

  form.onsubmit = function () {
    let err = document.createElement("p");
    err.textContent = "Los datos del formulario no son correctos";

    let isValid = true;

    if (
      form.name.length > 20 ||
      !form.name.contains("ANTONIO") ||
      form.name.length == 0
    ) {
      isValid = false;
      document.getElementById("parrafo_container").appendChild(err);
    } else if (form.mail.length <= 0) {
      isValid = false;
      document.getElementById("parrafo_container").appendChild(err);
    }

    return isValid;
  };
}

//Todo mal
