import { handleMenuToggle } from './mobile-menu/mobile-menu.js';
import { filterCategory, sortByValue } from './gallery/sort-by-value.js';
import { renderCards } from './gallery/render-cards.js';
import { openModal } from './modal/modal.js';

const gallery = document.querySelector('.gallery');
const filterList = document.querySelector('.filter');
const btnRefresh = document.querySelector('.btn--refresh');

let products = [];
let cardsForRender = null;
let refreshCounter = 1;

handleMenuToggle();

const visibleRefreshBtn = () => {
  if (cardsForRender.length <= refreshCounter) {
    btnRefresh.classList.add('is-active');
    return;
  }
  btnRefresh.classList.remove('is-active');
  refreshCounter = 1;
};

const renderCardsInGallery = () => {
  const cards = sortByValue(products, filterCategory(filterList));
  cardsForRender = renderCards(cards);
  gallery.innerHTML = cardsForRender[refreshCounter - 1];

  visibleRefreshBtn();
};

btnRefresh.addEventListener('click', () => {
  gallery.insertAdjacentHTML('beforeend', cardsForRender[refreshCounter]);
  refreshCounter += 1;
  visibleRefreshBtn();
});

fetch('./data/products.json')
  .then((res) => res.json())
  .then((res) => {
    products.push(...res);

    renderCardsInGallery();
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

filterList.addEventListener('change', () => {
  renderCardsInGallery();
});

window.matchMedia('(min-width: 993px)').addEventListener('change', (e) => {
  if (e.matches || !e.matches) renderCardsInGallery();
});

const onCardClick = (e) => {
  const isCardProduct = e.target.closest('button');

  if (!isCardProduct) {
    return;
  }

  const drinkName = isCardProduct.dataset.card;

  const drinkData = products.find(({ name }) => name === drinkName);
  openModal(drinkData);
};

gallery.addEventListener('click', onCardClick);
