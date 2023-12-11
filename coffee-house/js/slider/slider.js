const sliderStrip = document.querySelector('.favorite__list');
const imagesCards = document.querySelectorAll('.favorite-card');

const dots = document.querySelectorAll('.favorite__dot');

let width = null;
let count = 0;

export const initSlider = () => {
  width = document.querySelector('.favorite__slider-wrap').offsetWidth;
  sliderStrip.style.width = `${width * imagesCards.length}px`;

  imagesCards.forEach((el) => {
    console.log(width);
    el.style.width = width + 'px';
  });
};

export const rollSlider = () => {
  sliderStrip.style.transform = `translateX(-${count * width}px)`;
};

export const activeDot = (el) => {
  for (const dot of dots) {
    dot.classList.remove('active');
  }
  dots[el].classList.add('active');
};

export const flipSliderLeft = () => {
  count += 1;
  if (count >= imagesCards.length) {
    count = 0;
  }

  activeDot(count);
  rollSlider();
};
export const flipSliderRight = () => {
  count -= 1;
  if (count < 0) {
    count = imagesCards.length - 1;
  }

  activeDot(count);
  rollSlider();
};
