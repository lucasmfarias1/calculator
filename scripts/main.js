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

comma.onclick = () => {
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

backspace.onclick = () => {
  display.innerHTML = display.innerHTML.slice(0, -1);
  if (display.innerHTML.length < 2) {
    display.innerHTML = display.innerHTML.replace(/[^\d]/, '');
  }
};

clearButton.onclick = () => {
  display.innerHTML = '';
  operationDisplay.innerHTML = '';
};

operators.forEach((button) => {
  button.onclick = (e) => {
    if (operationDisplay.innerHTML == '' && display.innerHTML.length > 0){
      operationDisplay.innerHTML = display.innerHTML + e.target.innerHTML;
      display.innerHTML = '';
    } else {
      operationDisplay.innerHTML =
          operationDisplay.innerHTML.replace(/[^d]$/, e.target.innerHTML);
    }
  }
});

numButtons.forEach((button) => {
  button.onclick = (e) => {
    if (resultShowing == true) {
      display.innerHTML = '';
      resultShowing = false;
    }
    display.innerHTML += e.target.innerHTML;
    if (display.innerHTML.length > 1 &&
        display.innerHTML.match(/^0\d/)) {
      display.innerHTML = display.innerHTML.slice(1);
    }
  }
});

equals.onclick = () => {
  if (operationDisplay.innerHTML == '' || display.innerHTML == '') return;
  const operator = operationDisplay.innerHTML.slice(-1);
  const a = Number(operationDisplay.innerHTML.slice(0, -1));
  const b = Number(display.innerHTML);

  display.innerHTML = operate(operator, a, b);
  operationDisplay.innerHTML = '';
  resultShowing = true;
};

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
