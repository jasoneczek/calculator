const operators = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide
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