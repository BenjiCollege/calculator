"use strict";

// calculator that uses a function
// add two numbers
// substracts two numbers
// multiplies two numbers
// divides two numbers
// function calculate() {
//   const num1 = document.getElementById('num1').value;
//   const num2 = document.getElementById('num2').value;
//   num1 = parseFloat(num1);
//   num2 = parseFloat(num2);
//   const sum = add(num1, num2);
//   const difference = substract(num1, num2);
//   const product = multiply(num1, num2);
//   const quotient = divide(num1, num2);
//   document.getElementById('sum').innerHTML = sum;
//   document.getElementById('difference').innerHTML = difference;
//   document.getElementById('product').innerHTML = product;
//   document.getElementById('quotient').innerHTML = quotient;
// }
// clears the input on press of clear
// function clear() {
//   document.getElementById('num1').value = "";
//   document.getElementById('num2').value = "";
//   document.getElementById('sum').innerHTML = "";
//   document.getElementById('difference').innerHTML = "";
//   document.getElementById('product').innerHTML = "";
//   document.getElementById('quotient').innerHTML = "";
// }
var calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null
};

function inputDigit(digit) {
  var displayValue = calculator.displayValue,
      waitingForSecondOperand = calculator.waitingForSecondOperand;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  var firstOperand = calculator.firstOperand,
      displayValue = calculator.displayValue,
      operator = calculator.operator;
  var inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    var result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = "".concat(parseFloat(result.toFixed(7)));
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function updateDisplay() {
  var display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
}

updateDisplay();
var keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', function (event) {
  var target = event.target;
  var value = target.value;

  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;

    case '.':
      inputDecimal(value);
      break;

    case 'all-clear':
      resetCalculator();
      break;

    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }

  }

  updateDisplay();
});