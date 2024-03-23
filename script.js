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

const calculateResult = () => {
  const value = displayBottom.textContent;
  if (value !== '') {
    const secondNumber = parseFloat(value);
    result = operate(currentOperator, firstNumber, secondNumber);
    result = result.toFixed(3).replace(/\.?0*$/, '');
    displayBottom.textContent = result;
    firstNumber = parseFloat(result);
    currentOperator = null;
    topNumber.textContent = '';
  }
}

const displayNumbers = () => {
  numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const number = btn.textContent;

      if (result !== null) {
        result = null;
        displayBottom.textContent = '';
      }

      displayBottom.textContent += number;
    });
  })
}

const clearDisplay = () => {
  clearBtn.addEventListener('click', () => {
    topNumber.textContent = '';
    displayBottom.textContent = '';
  })
}

const deleteNumber = () => {
  deleteBtn.addEventListener('click', () => {
    const value = displayBottom.textContent;
    if (value !== '') {
      const newValue = value.slice(0, -1);
      displayBottom.textContent = newValue;
    }
  })
}

const toggleNegative = () => {
  plusMinusBtn.addEventListener('click', () => {
    let value = displayBottom.textContent;
    const newValue = value.charAt(0) === '-' ? value.slice(1) : `-${value}`;
    displayBottom.textContent = newValue;
  })
}

equalsBtn.addEventListener('click', calculateResult);

displayNumbers();
clearDisplay();
deleteNumber();
toggleNegative();
appendOperator();

