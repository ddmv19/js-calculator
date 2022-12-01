import './styles.css';
import { Calculator } from './classes/calculator';
import { body, themeImg, theme } from './js/main';

export const calculator = new Calculator();

let themeStorage = localStorage.getItem('theme'); 

if(themeStorage === 'dark') {
  body.classList.add('darkmode');
  themeImg.setAttribute('src', './assets/half-moon.png');
  theme.checked = true;
} else {
  body.classList.remove('darkmode');
  themeImg.setAttribute('src', './assets/sun.png');
  theme.checked = false;
}







