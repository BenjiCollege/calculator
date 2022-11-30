//function for the calculator
const calculator = {
  displayValue: "0",
  Num1: null,
  waitingForNum2: false,
  operator: null,
};
//function for inputting the numbers
function inputDigit(digit) {
  const { displayValue, waitingForNum2 } = calculator;

  if (waitingForNum2 === true) {
    calculator.displayValue = digit;
    calculator.waitingForNum2 = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}
//function for inputting decimal values
function inputDecimal(dot) {
  if (calculator.waitingForNum2 === true) {
    calculator.displayValue = "0.";
    calculator.waitingForNum2 = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}
//function for handling the operators and Infinity values
function handleOperator(nextOperator) {
  const { Num1, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForNum2) {
    calculator.operator = nextOperator;
    return;
  }

  if (Num1 == null && !isNaN(inputValue)) {
    calculator.Num1 = inputValue;
  } else if (operator) {
    const result = calculate(Num1, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.Num1 = result;
  }

  calculator.waitingForNum2 = true;
  calculator.operator = nextOperator;

  if (calculator.displayValue === "Infinity") {
    calculator.displayValue = "Error";
  }
}
//function for the calculation of addition, subtraction, multiplication and division
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
}
//function to reset the calculator
function resetCalculator() {
  calculator.displayValue = "0";
  calculator.Num1 = null;
  calculator.waitingForNum2 = false;
  calculator.operator = null;
}
//function to update the display
function updateDisplay() {
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  const { value } = target;
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
