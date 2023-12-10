import { cardGallery } from './card-gallery.js';

const determineCardCount = () => (window.innerWidth > 992 ? 8 : 4);

export const renderCards = (data) => {
  const cardCount = determineCardCount();
  const products = cardGallery(data);

  const result = [];
  for (let i = 0; i < products.length; i += cardCount) {
    const newElement = products.slice(i, i + cardCount);
    result.push(newElement.join(''));
  }

  return result;
};
