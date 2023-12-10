const stringWithHyphens = (str) =>
  str
    .split('')
    .map((ch) => {
      if (ch === ' ') {
        return '-';
      }
      return ch.toLowerCase();
    })
    .join('');

export const cardGallery = (data) => {
  return data.map((item) => {
    const { category, name, description, price } = item;
    const imgName = stringWithHyphens(name);

    return `<li class="gallery__card">
              <a href="javascript:void(0);" class="gallery__link">
                <picture class="gallery__image">
                  <source
                    srcset="
                      ./images/menu/${category}/${imgName}.webp    1x,
                      ./images/menu/${category}/${imgName}@2x.webp 2x
                    "
                    type="image/webp"
                  />
                  <source
                    srcset="
                      ./images/menu/${category}/${imgName}.jpg    1x,
                      ./images/menu/${category}/${imgName}@2x.jpg 2x
                    "
                    type="image/jpg"
                  />
                  <img
                    src="./images/menu/${category}/${imgName}.jpg"
                    alt="${name}"
                    width="340"
                    height="340"
                    loading="lazy"
                  />
                </picture>

                <div class="gallery-card__info">
                  <h2 class="gallery-card__title">${name}</h2>
                  <p class="gallery-card__text">
                    ${description}
                  </p>
                  <p class="gallery-card__price">&#36;${price}</p>
                </div>
              </a>
            </li>`;
  });
};
