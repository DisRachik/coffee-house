import { h as handleMenuToggle } from "./mobile-menu-32f4a4f8.js";
const sliderStrip = document.querySelector(".favorite__list");
const imagesCards = document.querySelectorAll(".favorite-card");
const dots = document.querySelectorAll(".favorite__dot");
let width = null;
let count = 0;
const timeForAnimation = 7e3;
let timerId = null;
let startTime = 0;
let hoverStartTime = 0;
let remainingTime = 0;
const initSlider = () => {
  width = document.querySelector(".favorite__slider-wrap").offsetWidth;
  sliderStrip.style.width = `${width * imagesCards.length}px`;
  imagesCards.forEach((el) => {
    el.style.width = width + "px";
  });
  activeDot(count);
  animationForSlider();
};
const rollSlider = () => {
  sliderStrip.style.transform = `translateX(-${count * width}px)`;
};
const activeDot = (el) => {
  for (const dot of dots) {
    dot.classList.remove("active");
    dot.firstElementChild.style.transitionDuration = "";
    dot.firstElementChild.style.transform = "";
  }
  dots[el].classList.add("active");
  dots[el].firstElementChild.style.transitionDuration = timeForAnimation + "ms";
};
const flipSliderRight = () => {
  count += 1;
  if (count >= imagesCards.length) {
    count = 0;
  }
  activeDot(count);
  rollSlider();
  remainingTime = 0;
  animationForSlider();
};
const flipSliderLeft = () => {
  count -= 1;
  if (count < 0) {
    count = imagesCards.length - 1;
  }
  activeDot(count);
  rollSlider();
  remainingTime = 0;
  animationForSlider();
};
const switchSliderByDots = () => {
  dots.forEach((item, countDot) => {
    item.addEventListener("click", () => {
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
const holdSlider = () => {
  clearInterval(timerId);
  hoverStartTime = Date.now();
  const elapsedTime = hoverStartTime - startTime;
  remainingTime = timeForAnimation - elapsedTime;
  const positionForFillDot = window.getComputedStyle(dots[count].firstElementChild).getPropertyValue("transform");
  const matrixValues = positionForFillDot.split(", ");
  const dotWidth = dots[count].offsetWidth;
  const translateXInPixels = parseFloat(matrixValues[matrixValues.length - 2]);
  const remainingPercentage = translateXInPixels / dotWidth * 100;
  dots[count].firstElementChild.style.transform = `translateX(${remainingPercentage}%)`;
};
const continueSlider = () => {
  animationForSlider();
  dots[count].firstElementChild.style.transform = "";
};
const sliderArea = document.querySelector(".favorite__slider-wrap");
const arrowRight = document.querySelector(".favorite--btn__right");
const arrowLeft = document.querySelector(".favorite--btn__left");
let startX = null;
handleMenuToggle();
initSlider();
switchSliderByDots();
window.addEventListener("resize", initSlider);
arrowRight.addEventListener("click", flipSliderRight);
arrowLeft.addEventListener("click", flipSliderLeft);
sliderArea.addEventListener("mouseenter", holdSlider);
sliderArea.addEventListener("mouseleave", continueSlider);
const handlePointerDown = (e) => {
  startX = e.changedTouches[0].clientX;
  holdSlider();
};
const handlePointerUp = (e) => {
  let endX = null;
  endX = e.changedTouches[0].clientX;
  const deltaX = endX - startX;
  startX = null;
  endX = null;
  if (deltaX > 5) {
    flipSliderLeft();
  }
  if (deltaX < 5) {
    flipSliderRight();
  }
  continueSlider();
};
sliderArea.addEventListener("touchstart", handlePointerDown);
sliderArea.addEventListener("touchend", handlePointerUp);
