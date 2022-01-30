let displayValue = '0';
const display = document.querySelector('#display');

const buttons = document.querySelectorAll('#buttons button');
buttons.forEach(button => {
  button.addEventListener('click', event => {
    if (event.target.classList.contains('number')) {
      if (displayValue === '0') displayValue = '';
      displayValue += event.target.textContent;
      updateDisplay();
    } else if (event.target.classList.contains('operator')) {
      if (isNaN(parseInt(displayValue.toString()[displayValue.toString().length - 1]))) return;
      displayValue += ` ${event.target.textContent} `;
      updateDisplay();
    } else if (event.target.id === 'equals') {
      displayValue = parseDisplay();
      updateDisplay();
      if (displayValue == 'ERROR') error();
      if (displayValue == 'Ouch!') error();
    } else if (event.target.id === 'clear') {
      displayValue = '0';
      updateDisplay();
    }
  });
});

// Functions for calculator operations
function add(addend1, addend2) {
  return addend1 + addend2;
}

function subtract(minuend, subtrahend) {
  return minuend - subtrahend;
}

function multiply(factor1, factor2) {
  return factor1 * factor2;
}

function divide(dividend, divisor) {
  return dividend / divisor;
}

function operate(operator, operand1, operand2) {
  switch (operator) {
    case '+':
      return add(operand1, operand2);
    case '−':
      return subtract(operand1, operand2);
    case '×':
      return multiply(operand1, operand2);
    case '÷':
      return divide(operand1, operand2);
  }
}

function updateDisplay() {
  display.textContent = displayValue;
}

function parseDisplay() {
  const stack = displayValue.toString().split(' ');
  console.table(stack);
  if (!stack[stack.length-1]) {
    return 'ERROR';
  }
  const operands = stack.filter(item => !isNaN(parseInt(item)));
  const operators = stack.filter(item => isNaN(parseInt(item)));
  let result = operands.reduce((accumulator, current, index) => {
    return operate(operators[index - 1], new Number(accumulator), new Number(current));
  });
  if (result == Infinity) return 'Ouch!';
  result = ((result % 1) != 0) ? parseFloat(result.toPrecision(8)) : result;
  return result;
}

function error() {
  for (let i = 1; i <= 6; i++) {
    setTimeout(function() {
      display.style.color = (display.style.color == 'red' ? 'black' : 'red');
    }, 250*i);
  }
  setTimeout(function() {
    displayValue = '0';
    updateDisplay();
  }, 1500);
}
