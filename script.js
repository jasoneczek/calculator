const operators = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide
}

const numberBtns = document.querySelectorAll('.btn-number');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const plusMinusBtn = document.querySelector('#plusMinusBtn');
const equalsBtn = document.querySelector('#btn-equals');
const topNumber = document.querySelector('#topNumber');
const displayBottom = document.querySelector('#displayBottom');
const operatorBtns = document.querySelectorAll('.btn-operator');

function appendOperator() {
  operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let operatorSign = btn.textContent;
      console.log(operatorSign);
      let value = displayBottom.textContent;
      
      if (value !== null) {
        topNumber.textContent = `${value} ${operatorSign}`;
        displayBottom.textContent = '';
      }
    })
  })
}

function displayNumbers() {
  numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let number = btn.textContent;
      displayBottom.textContent += number;
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
  if (b === 0) {
    return "Error. Division by 0 not allowed."
  }
  return a / b;
}

function operate(operator, num1, num2) {
  if (Object.hasOwn(operators, operator)) {
    return operators[operator](num1, num2);
  }
}

displayNumbers();
clearDisplay();
deleteNumber();
toggleNegative();
appendOperator();

