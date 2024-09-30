let num1 = 0;
let num2 = 0;
let memory = 0;
let symbol = "";
let firstOperation = true;
let symbolPressed = false;
let display = document.getElementById("display");

let operadores = ["-", "+", "X", "/"];

function setDisplay(param) {
  if (firstOperation && param != "0") {
    display.value = param;
    firstOperation = false;
  } else {
    if (operadores.includes(param)) {
      display.value = "";
    } else {
      display.value += param;
    }
  }
}

function storeValue() {
  if (num1 != 0) {
    num2 = Number(display.value);
  } else {
    num1 = Number(display.value);
  }
}

function storeSymbol(param) {
  if (symbol == "") {
    symbol = param;
    symbolPressed = true;
  }
}

function calculateResult() {
  switch (symbol) {
    case "+":
      num1 = num1 + num2;
      break;
    case "-":
      num1 = num1 - num2;
      break;
    case "X":
      num1 = num1 * num2;
      break;
    case "/":
      num1 = num1 / num2;
      break;
  }

  if (num1 % 1 != 0) {
    num1 = num1.toFixed(3);
  }

  display.value = num1;

  num2 = 0;
  symbol = "";
  symbolPressed = false;
}

function deleteOperation() {
  num1 = 0;
  num2 = 0;
  symbol = "";
  display.value = "0";
  firstOperation = true;
  symbolPressed = false;
}

function displayMemory() {
  if (memory != 0) {
    display.value = memory;
  }
}

function addMemory() {
  if (display.value != "0" && !symbolPressed) {
    memory += Number(display.value);
    display.value = 0;
    firstOperation = true;
  }
}

function clearMemory() {
  memory = 0;
}
