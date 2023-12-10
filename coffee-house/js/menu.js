import { handleMenuToggle } from './mobile-menu.js';
import { cardGallery } from './gallery/card-gallery.js';

const gallery = document.querySelector('.gallery');

handleMenuToggle();

fetch('./data/products.json')
  .then((res) => res.json())
  .then((res) => {
    const cards = cardGallery(res);
    gallery.innerHTML = cards;
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
