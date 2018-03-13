const display = document.querySelector('#display');
const operationDisplay = document.querySelector('#display-operation');
const numButtons = document.querySelectorAll('button.number');
const operators = document.querySelectorAll('button.operator');
const clearButton = document.querySelector('#clear');
const backspace = document.querySelector('#backspace');
const equals = document.querySelector('#equals');
const negate = document.querySelector('#negate');
const comma = document.querySelector('#comma');

let resultShowing = false;

comma.onclick = inputComma;

function inputComma() {
  if (display.innerHTML.match(/\./)) {
    return;
  } else if (display.innerHTML == '') {
    display.innerHTML = '0.';
  } else {
    display.innerHTML += '.';
  }
}

negate.onclick = () => {
  display.innerHTML = display.innerHTML * (-1);
}

backspace.onclick = eraseCharacter;

function eraseCharacter() {
  if (display.innerHTML.slice(1).match(/[^\.\d-+*/]/)) return;

  display.innerHTML = display.innerHTML.slice(0, -1);
  if (display.innerHTML.length < 2) {
    display.innerHTML = display.innerHTML.replace(/[^\d]/, '');
  }
}

clearButton.onclick = clearDisplay;

function clearDisplay() {
  display.innerHTML = '';
  operationDisplay.innerHTML = '';
}

operators.forEach((button) => {
  button.onclick = inputOperator;
});

function inputOperator(e) {

  let key = document.querySelector(`button[data-key="${e.keyCode}"]`);
  if (!key) key = e.target;

  if (operationDisplay.innerHTML == '' && display.innerHTML.length > 0){
    operationDisplay.innerHTML = display.innerHTML + key.innerHTML;
    display.innerHTML = '';
  } else {
    operationDisplay.innerHTML =
        operationDisplay.innerHTML.replace(/[^d]$/, key.innerHTML);
  }
}

numButtons.forEach((button) => {
  button.addEventListener('click', inputNumber);
});

function inputNumber(e) {

  let key = document.querySelector(`button[data-key="${e.keyCode}"]`);
  if (!key) key = e.target;

  if (resultShowing == true) {
    display.innerHTML = '';
    resultShowing = false;
  }
  display.innerHTML += key.innerHTML;
  if (display.innerHTML.length > 1 &&
      display.innerHTML.match(/^0\d/)) {
    display.innerHTML = display.innerHTML.slice(1);
  }
}

equals.onclick = getResult;

function getResult() {
  if (operationDisplay.innerHTML == '' || display.innerHTML == '') return;
  const operator = operationDisplay.innerHTML.slice(-1);
  const a = Number(operationDisplay.innerHTML.slice(0, -1));
  const b = Number(display.innerHTML);

  display.innerHTML = operate(operator, a, b);
  operationDisplay.innerHTML = '';
  resultShowing = true;
}

function inputSomething(e) {
  const key = document.querySelector(`button[data-key="${e.keyCode}"]`);
  if (key.getAttribute('class').match('number')) {
    inputNumber(e);
  } else if (key.getAttribute('class').match('operator')) {
    inputOperator(e);
  } else if (key.getAttribute('id').match('equals')) {
    getResult();
  } else if (key.getAttribute('id').match('comma')) {
    inputComma();
  } else if (key.getAttribute('id').match('backspace')) {
    eraseCharacter();
  } else if (key.getAttribute('id').match('clear')) {
    clearDisplay();
  }
}

window.addEventListener('keydown', inputSomething);

//Core calculating functions

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

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);

    case '-':
      return subtract(a, b);

    case '*':
      return multiply(a, b);

    case '/':
      return divide(a, b);
  }
}
