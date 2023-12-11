import { handleMenuToggle } from './mobile-menu/mobile-menu.js';
import { initSlider, flipSliderLeft, flipSliderRight } from './slider/slider.js';

const arrowRight = document.querySelector('.favorite--btn__right');
const arrowLeft = document.querySelector('.favorite--btn__left');

handleMenuToggle();
initSlider();
window.addEventListener('resize', initSlider);

arrowRight.addEventListener('click', flipSliderRight);
arrowLeft.addEventListener('click', flipSliderLeft);
