import { stringWithHyphens } from '../helpers/stringWithHyphens.js';

export const markupImage = (name, category) => {
  const imgName = stringWithHyphens(name);

  return `<picture class="gallery__image modal__img">
          <source
            srcset="./menu/${category}/${imgName}.webp 1x, ./menu/${category}/${imgName}@2x.webp 2x"
            type="image/webp"
          />
          <source
            srcset="./menu/${category}/${imgName}.jpg 1x, ./menu/${category}/${imgName}@2x.jpg 2x"
            type="image/jpg"
          />
          <img
            src="./menu/${category}/${imgName}.jpg"
            alt="${name}"
            width="340"
            height="340"
          />
        </picture>`;
};
