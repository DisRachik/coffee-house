import { handleMenuToggle } from './mobile-menu.js';
import { cardGallery } from './gallery/card-gallery.js';
import { filterCategory, sortByValue } from './gallery/sort-by-value.js';

const gallery = document.querySelector('.gallery');
const filterList = document.querySelector('.filter');
let products = [];

handleMenuToggle();

fetch('./data/products.json')
  .then((res) => res.json())
  .then((res) => {
    products.push(...res);
    console.log(products);

    const cards = sortByValue(products, filterCategory(filterList));
    gallery.innerHTML = cardGallery(cards);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

filterList.addEventListener('change', (event) => {
  const cards = sortByValue(products, filterCategory(filterList));
  gallery.innerHTML = cardGallery(cards);
});
