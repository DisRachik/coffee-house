import { markupCheckBtn } from './markup-check.js';
import { markupImage } from './markup-image.js';
import { markupRadioBtn } from './markup-radio.js';

const backdrop = document.querySelector('.backdrop');
const closeBtn = document.querySelector('.modal__btn');

const imageWrap = document.querySelector('.gallery__wrap-image');
const titleDrink = document.querySelector('.modal__title');
const descriptionDrink = document.querySelector('.modal__description');
const totalPrice = document.querySelector('.modal__total>span');

const pickDrink = document.querySelector('.js-drink-size');
const pickAdditives = document.querySelector('.js-drink-additives');

let totalPriceForDrink = {
  price: 0,
  size: 0,
  additives: 0,

  sum() {
    const total = this.price + this.size + this.additives;
    return total.toFixed(2);
  },
};

const onClose = (e) => {
  if (e.currentTarget !== e.target) {
    return;
  }

  backdrop.classList.add('backdrop--is-hidden');
  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onEscCloseForm);
};

export const onEscCloseForm = ({ code }) => {
  if (code === 'Escape') {
    backdrop.classList.add('backdrop--is-hidden');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onEscCloseForm);

    console.log('first');
  }
};

export const openModal = (data) => {
  const { name, category, description, sizes, additives, price } = data;

  document.addEventListener('keydown', onEscCloseForm);
  backdrop.addEventListener('click', onClose);
  closeBtn.addEventListener('click', onClose);

  backdrop.classList.remove('backdrop--is-hidden');
  document.body.classList.add('no-scroll');

  imageWrap.innerHTML = markupImage(name, category);
  titleDrink.textContent = name;
  descriptionDrink.textContent = description;
  totalPrice.textContent = price;
  totalPriceForDrink.price = parseFloat(price);

  pickDrink.innerHTML = markupRadioBtn(sizes);
  pickAdditives.innerHTML = markupCheckBtn(additives);
};

pickDrink.addEventListener('change', () => {
  const addPrice = pickDrink.querySelector('input[name="pick-size"]:checked').value;

  totalPriceForDrink.size = parseFloat(addPrice);
  totalPrice.textContent = totalPriceForDrink.sum();
});

pickAdditives.addEventListener('change', () => {
  const selected = pickAdditives.querySelectorAll('input[name="pick-additives"]');
  let addForAdditives = 0;

  selected.forEach((check) => {
    if (check.checked) addForAdditives += parseFloat(check.value);
  });

  totalPriceForDrink.additives = addForAdditives;
  totalPrice.textContent = totalPriceForDrink.sum();
});
