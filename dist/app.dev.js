"use strict";

//function for the calculator
var calculator = {
  displayValue: "0",
  Num1: null,
  waitingForNum2: false,
  operator: null
}; //function for inputting the numbers

function inputDigit(digit) {
  var displayValue = calculator.displayValue,
      waitingForNum2 = calculator.waitingForNum2;

  if (waitingForNum2 === true) {
    calculator.displayValue = digit;
    calculator.waitingForNum2 = false;
  } else {
    calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
  }
} //function for inputting decimal values


function inputDecimal(dot) {
  if (calculator.waitingForNum2 === true) {
    calculator.displayValue = "0.";
    calculator.waitingForNum2 = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
} //function for handling the operators and Infinity values


function handleOperator(nextOperator) {
  var Num1 = calculator.Num1,
      displayValue = calculator.displayValue,
      operator = calculator.operator;
  var inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForNum2) {
    calculator.operator = nextOperator;
    return;
  }

  if (Num1 == null && !isNaN(inputValue)) {
    calculator.Num1 = inputValue;
  } else if (operator) {
    var result = calculate(Num1, inputValue, operator);
    calculator.displayValue = "".concat(parseFloat(result.toFixed(7)));
    calculator.Num1 = result;
  }

  calculator.waitingForNum2 = true;
  calculator.operator = nextOperator;

  if (calculator.displayValue === "Infinity") {
    calculator.displayValue = "Error";
  }
} //function for the calculation of addition, subtraction, multiplication and division


function calculate(Num1, Num2, operator) {
  if (operator === "+") {
    return Num1 + Num2;
  } else if (operator === "-") {
    return Num1 - Num2;
  } else if (operator === "*") {
    return Num1 * Num2;
  } else if (operator === "/") {
    return Num1 / Num2;
  }

  return Num2;
} //function to reset the calculator


function resetCalculator() {
  calculator.displayValue = "0";
  calculator.Num1 = null;
  calculator.waitingForNum2 = false;
  calculator.operator = null;
} //function to update the display


function updateDisplay() {
  var display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();
var keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", function (event) {
  var target = event.target;
  var value = target.value;

  if (!target.matches("button")) {
    return;
  }

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;

    case ".":
      inputDecimal(value);
      break;

    case "all-clear":
      resetCalculator();
      break;

    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }

  }

  updateDisplay();
});