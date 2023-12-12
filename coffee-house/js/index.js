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

let startX = null;

handleMenuToggle();
initSlider();
switchSliderByDots();
window.addEventListener('resize', initSlider);

arrowRight.addEventListener('click', flipSliderRight);
arrowLeft.addEventListener('click', flipSliderLeft);

sliderArea.addEventListener('mouseenter', holdSlider);
sliderArea.addEventListener('mouseleave', continueSlider);

const handlePointerDown = (e) => {
  holdSlider();
  startX = e.clientX;
};

const handlePointerUp = (e) => {
  continueSlider();
  const endX = e.clientX;
  const deltaX = endX - startX;

  if (deltaX > 0) {
    flipSliderLeft();
  } else if (deltaX < 0) {
    flipSliderRight();
  }
};

sliderArea.addEventListener('pointerdown', handlePointerDown);
sliderArea.addEventListener('pointerup', handlePointerUp);
