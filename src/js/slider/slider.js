const sliderStrip = document.querySelector('.favorite__list');
const imagesCards = document.querySelectorAll('.favorite-card');

const dots = document.querySelectorAll('.favorite__dot');

let width = null;
let count = 0;

const timeForAnimation = 7000;
let timerId = null;
let startTime = 0;
let hoverStartTime = 0;
let remainingTime = 0;

export const initSlider = () => {
  width = document.querySelector('.favorite__slider-wrap').offsetWidth;
  sliderStrip.style.width = `${width * imagesCards.length}px`;

  imagesCards.forEach((el) => {
    el.style.width = width + 'px';
  });
  activeDot(count);

  animationForSlider();
};

export const rollSlider = () => {
  sliderStrip.style.transform = `translateX(-${count * width}px)`;
};

export const activeDot = (el) => {
  for (const dot of dots) {
    dot.classList.remove('active');
    dot.firstElementChild.style.transitionDuration = '';
    dot.firstElementChild.style.transform = '';
  }
  dots[el].classList.add('active');
  dots[el].firstElementChild.style.transitionDuration = timeForAnimation + 'ms';
};

export const flipSliderRight = () => {
  count += 1;
  if (count >= imagesCards.length) {
    count = 0;
  }

  activeDot(count);
  rollSlider();
  remainingTime = 0;
  animationForSlider();
};
export const flipSliderLeft = () => {
  count -= 1;
  if (count < 0) {
    count = imagesCards.length - 1;
  }

  activeDot(count);
  rollSlider();
  remainingTime = 0;
  animationForSlider();
};

export const switchSliderByDots = () => {
  dots.forEach((item, countDot) => {
    item.addEventListener('click', () => {
      count = countDot;
      activeDot(count);
      rollSlider();
      animationForSlider();
    });
  });
};

const animationForSlider = () => {
  clearInterval(timerId);

  startTime = Date.now();

  const timeForStart = remainingTime ? remainingTime : timeForAnimation;

  timerId = setInterval(() => {
    flipSliderRight();
  }, timeForStart);
};

export const holdSlider = () => {
  clearInterval(timerId);
  hoverStartTime = Date.now();

  const elapsedTime = hoverStartTime - startTime;
  remainingTime = timeForAnimation - elapsedTime;

  const positionForFillDot = window
    .getComputedStyle(dots[count].firstElementChild)
    .getPropertyValue('transform');
  const matrixValues = positionForFillDot.split(', ');
  const dotWidth = dots[count].offsetWidth;
  const translateXInPixels = parseFloat(matrixValues[matrixValues.length - 2]);
  const remainingPercentage = (translateXInPixels / dotWidth) * 100;

  dots[count].firstElementChild.style.transform = `translateX(${remainingPercentage}%)`;
};
export const continueSlider = () => {
  animationForSlider();
  dots[count].firstElementChild.style.transform = '';
};
