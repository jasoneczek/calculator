const numberBtns = document.querySelectorAll('.btn-number');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const plusMinusBtn = document.querySelector('#plusMinusBtn');
const equalsBtn = document.querySelector('#equalsBtn');
const topNumber = document.querySelector('#topNumber');
const displayBottom = document.querySelector('#displayBottom');
const operatorBtns = document.querySelectorAll('.btn-operator');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b !== 0? a / b : alert("Error: Division by zero not allowed"));

let firstNumber = null;
let currentOperator = null;
let result = null;

const operate = (operator, num1, num2) => {
  switch (operator) {
    case '+': return add(num1, num2);
    case '-': return subtract(num1, num2);
    case '*': return multiply(num1, num2)
    case '/': return divide(num1, num2);
    default: return num2;
  }
};

const appendOperator = () => {
  operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const operatorSign = btn.dataset.operator;
      const value = displayBottom.textContent;
      
      if (value !== '') {
        if (firstNumber === null) {
          firstNumber = parseFloat(value);
          currentOperator = operatorSign;
          topNumber.textContent = `${value} ${operatorSign}`;
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

equalsBtn.addEventListener('click', calculateResult);

displayNumbers();
clearDisplay();
deleteNumber();
toggleNegative();
appendOperator();

