import { handleMenuToggle } from './mobile-menu/mobile-menu.js';
import {
  initSlider,
  flipSliderLeft,
  flipSliderRight,
  switchSliderByDots,
  holdSlider,
  continueSlider,
} from './slider/slider.js';

const sliderArea = document.querySelector('.favorite__slider-wrap');
const arrowRight = document.querySelector('.favorite--btn__right');
const arrowLeft = document.querySelector('.favorite--btn__left');

handleMenuToggle();
initSlider();
switchSliderByDots();
window.addEventListener('resize', initSlider);

arrowRight.addEventListener('click', flipSliderRight);
arrowLeft.addEventListener('click', flipSliderLeft);

sliderArea.addEventListener('mouseenter', holdSlider);
sliderArea.addEventListener('mouseleave', continueSlider);
