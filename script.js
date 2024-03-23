const numberBtns = document.querySelectorAll('.btn-number');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const plusMinusBtn = document.querySelector('#plusMinusBtn');
const equalsBtn = document.querySelector('#equalsBtn');
const topNumber = document.querySelector('#topNumber');
const displayBottom = document.querySelector('#displayBottom');
const operatorBtns = document.querySelectorAll('.btn-operator');

let firstNumber = null;
let currentOperator = null;
let result = null;

equalsBtn.addEventListener('click', calculateResult);

function appendOperator() {
  operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const operatorSign = btn.dataset.operator;
      const value = displayBottom.textContent;
      
      if (value !== null) {
        if (firstNumber === null) {
          firstNumber = parseFloat(value);
          currentOperator = operatorSign;
          topNumber.textContent = `${value} ${operatorSign}`;
          displayBottom.textContent = '';
        } else {
          const secondNumber = parseFloat(value);
          result = operate(currentOperator, firstNumber, secondNumber);
          displayBottom.textContent = result;
          firstNumber = result;
          currentOperator = operatorSign;
          topNumber.textContent = `${result} ${operatorSign}`;
        }
      }
      displayBottom.textContent = '';
    });
  });
}

function calculateResult() {
  const value = displayBottom.textContent;
  if (value !== '') {
    const secondNumber = parseFloat(value);
    result = operate(currentOperator, firstNumber, secondNumber);
    displayBottom.textContent = result;
    firstNumber = result;
    currentOperator = null;
    topNumber.textContent = '';
  }
}

function displayNumbers() {
  numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const number = btn.textContent;

      if (result !== null) {
        result = null;
        displayBottom.textContent = '';
        displayBottom.textContent += number;
      } else {
        displayBottom.textContent += number;
      } 
    });
  })
}

function clearDisplay() {
  clearBtn.addEventListener('click', () => {
    topNumber.textContent = '';
    displayBottom.textContent = '';
  })
}

function deleteNumber() {
  deleteBtn.addEventListener('click', () => {
    let value = displayBottom.textContent;
    let newValue; 
    if (value !== '') {
      newValue = value.slice(0, -1);
      displayBottom.textContent = newValue;
    }
  })
}

function toggleNegative() {
  plusMinusBtn.addEventListener('click', () => {
    let value = displayBottom.textContent;
    let newValue;
    if (value.charAt(0) === '-') {
      newValue = value.slice(1);
    } else {
      newValue = `-${value}`;
    }
    displayBottom.textContent = newValue;
  })
}

// Basic math operators
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

// Performs arithmetic operations based on the operator symbol
function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      if (num2 !== 0) {
        return divide(num1, num2);
      } else {
        alert("Error: Division by zero not allowed");
      }
    default:
      return num2;
  }
}

displayNumbers();
clearDisplay();
deleteNumber();
toggleNegative();
appendOperator();

