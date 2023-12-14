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
  startX = e.changedTouches[0].clientX;
  holdSlider();
};

const handlePointerUp = (e) => {
  continueSlider();

  let endX = null;
  endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;
  startX = null;
  endX = null;

  if (deltaX > 0) {
    flipSliderLeft();
  } else {
    flipSliderRight();
  }
};

sliderArea.addEventListener('touchstart', handlePointerDown);
document.addEventListener('touchend', handlePointerUp);
