import { calculator } from "../index";


export const body = document.querySelector('body');

export const theme = document.querySelector('#theme');
export const themeImg = document.querySelector('.calculator__theme_image-container img');

const input = document.querySelector('.calculator__input');
const buttons = document.querySelectorAll ('.btn');

const lastOperation = document.querySelector('.last-operation');

let valueOfInput = "";
let result;

theme.addEventListener('click', () => {
  body.classList.toggle('darkmode');
  if(!theme.checked) {
    themeImg.setAttribute('src', './assets/sun.png');
    localStorage.setItem('theme', 'light');
  } else {
    themeImg.setAttribute('src', './assets/half-moon.png');
    localStorage.setItem('theme', 'dark');
  }
});

body.addEventListener('keydown', (event) => {
  const keyValue = event.key;
  const keyCode = event.code;
  if(keyCode.includes('Digit') || keyCode.includes('Numpad')) {
    const lastValue = input.value[input.value.length - 1];
    const isValid = lastValue === '/' || lastValue === '*' || lastValue === '-' || lastValue === '+';
    if(!isNaN(keyValue)) {
      valueOfInput += keyValue;
      input.value += keyValue;
    } else if(isNaN(keyValue) && input.value.length > 0 && !isValid){
      valueOfInput += ' ' + keyValue + ' ';
      input.value += keyValue;
    }
  }
});

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const dataId = btn.getAttribute('data-id');
    const lastValue = input.value[input.value.length - 1];
    const isValid = lastValue === '/' || lastValue === '*' || lastValue === '-' || lastValue === '+';
    if(dataId === 'C') {
      input.value = '';
      valueOfInput = '';
    } else if(dataId === '+/-' && input.value.length > 0) {
      const valActualInput = input.value;
      let number = parseFloat(valActualInput);
      number = number - (number * 2);
      input.value = number;
      valueOfInput = number + '';
    } else if(dataId === '=' && input.value.length > 0) {
      calculator.array = valueOfInput.split(' ');
      while(calculator.array.length >= 2) {
        result = resolve(calculator.array);
      }
      lastOperation.innerText = input.value;
      input.value = result;
    } else if(dataId.includes('number') || dataId === '..') {
      const numberPressed = dataId.charAt(dataId.length - 1);
      valueOfInput += numberPressed;
      input.value += numberPressed;
    } else if(dataId.includes('operator') && input.value.length > 0 && !isValid) {
      const operator = dataId.charAt(dataId.length - 1);
      valueOfInput += ' ' + operator + ' ';
      input.value += operator;
    } else if(dataId === 'delete' && input.value.length > 0) {
      valueOfInput = '';
      let inputValue = input.value.split('');
      inputValue.pop();
      const newValue = inputValue.join('');
      for(let i = 0; i < newValue.length; i++) {
        const isValid = newValue[i] === '/' || newValue[i] === '*' || newValue[i] === '-' 
        || newValue[i] === '+';
        if(isValid && i >= 2) {
          valueOfInput += ' ' + newValue[i] + ' ';
        } else {
          valueOfInput += newValue[i];
        }
      }
      input.value = newValue;
    }
  });
});

const resolve = (array) => {
  for(let i = 1; i < array.length; i++) {
    if(array[i] === '+' || array[i] === '/' 
    || array[i] === '*' || array[i] === '-') {
      const operator = array[i];
      const firstNumber = parseFloat(array[i - 1]);
      const secondNumber = parseFloat(array[i + 1]);
      let result = 0;
      array.shift();
      array.shift();
      if(operator === '+') {
        result = calculator.sum(firstNumber, secondNumber);
      } else if(operator === '-') {
        result = calculator.subtrack(firstNumber, secondNumber);
      } else if(operator === '*') {
        result = calculator.multiplication(firstNumber, secondNumber);
      } else if(operator === '/') {
        result = calculator.division(firstNumber, secondNumber);
      }
      array[i - 1] = result.toString();
      return result;
    }
  }
}
