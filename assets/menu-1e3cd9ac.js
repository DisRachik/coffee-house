import { h as handleMenuToggle } from "./mobile-menu-32f4a4f8.js";
const filterCategory = (el) => el.querySelector('input[name="filter__check"]:checked').value;
const sortByValue = (data, value) => data.filter((items) => items.category === value);
const stringWithHyphens = (str) => str.split("").map((ch) => {
  if (ch === " ") {
    return "-";
  }
  return ch.toLowerCase();
}).join("");
const cardGallery = (data) => {
  return data.map((item) => {
    const { category, name, description, price } = item;
    const imgName = stringWithHyphens(name);
    return `<li class="gallery__card">
              <button type="button" class="gallery__link" aria-label="Product details ${name}" data-card="${name}">
                <picture class="gallery__image">
                  <source
                    srcset="
                      ./src/images/menu/${category}/${imgName}.webp    1x,
                      ./src/images/menu/${category}/${imgName}@2x.webp 2x
                    "
                    type="image/webp"
                  />
                  <source
                    srcset="
                      ./src/images/menu/${category}/${imgName}.jpg    1x,
                      ./src/images/menu/${category}/${imgName}@2x.jpg 2x
                    "
                    type="image/jpg"
                  />
                  <img
                    src="./src/images/menu/${category}/${imgName}.jpg"
                    alt="${name}"
                    width="340"
                    height="340"
                  />
                </picture>

                <div class="gallery-card__info">
                  <h2 class="gallery-card__title">${name}</h2>
                  <p class="gallery-card__text">
                    ${description}
                  </p>
                  <p class="gallery-card__price">&#36;${price}</p>
                </div>
              </button>
            </li>`;
  });
};
const determineCardCount = () => window.innerWidth > 768 ? 8 : 4;
const renderCards = (data) => {
  const cardCount = determineCardCount();
  const products2 = cardGallery(data);
  const result = [];
  for (let i = 0; i < products2.length; i += cardCount) {
    const newElement = products2.slice(i, i + cardCount);
    result.push(newElement.join(""));
  }
  return result;
};
const markupCheckBtn = (additives) => {
  let counter = 0;
  return additives.map((item) => {
    counter += 1;
    return `<label class="pick__label" aria-labelledby="${item.name.toLowerCase()}-label">
                <input type="checkbox" name="pick-additives" class="pick__check"
                value="${item["add-price"]}" />

                <span class="pick__type">
                  <span class="pick__icon">${counter}</span>
                  <span class="pick__description" id="${item.name.toLowerCase()}-label">
                  ${item.name}</span>
                </span>
              </label>`;
  }).join("");
};
const markupImage = (name, category) => {
  const imgName = stringWithHyphens(name);
  return `<picture class="gallery__image modal__img">
          <source
            srcset="./src/images/menu/${category}/${imgName}.webp 1x, ./src/images/menu/${category}/${imgName}@2x.webp 2x"
            type="image/webp"
          />
          <source
            srcset="./src/images/menu/${category}/${imgName}.jpg 1x, ./src/images/menu/${category}/${imgName}@2x.jpg 2x"
            type="image/jpg"
          />
          <img
            src="./src/images/menu/${category}/${imgName}.jpg"
            alt="${name}"
            width="340"
            height="340"
          />
        </picture>`;
};
const markupRadioBtn = (sizes) => {
  const keysSize = Object.keys(sizes);
  return keysSize.map((key) => {
    const conditions = sizes[key];
    const checked = keysSize.indexOf(key) === 0 ? "checked" : "";
    return `<label class="pick__label" aria-labelledby="${key.toLowerCase()}-size">
                  <input type="radio" name="pick-size" class="pick__check"
                  value="${conditions["add-price"]}" ${checked} />

                  <span class="pick__type pick__type--radio">
                    <span class="pick__icon">${key.toUpperCase()}</span>
                    <span class="pick__description" id="${key.toLowerCase()}-size">${conditions.size}</span>
                  </span>
                </label>`;
  }).join("");
};
const backdrop = document.querySelector(".backdrop");
const closeBtn = document.querySelector(".modal__btn");
const imageWrap = document.querySelector(".gallery__wrap-image");
const titleDrink = document.querySelector(".modal__title");
const descriptionDrink = document.querySelector(".modal__description");
const totalPrice = document.querySelector(".modal__total>span");
const pickDrink = document.querySelector(".js-drink-size");
const pickAdditives = document.querySelector(".js-drink-additives");
let totalPriceForDrink = {
  price: 0,
  size: 0,
  additives: 0,
  sum() {
    const total = this.price + this.size + this.additives;
    return total.toFixed(2);
  }
};
const onClose = (e) => {
  if (e.currentTarget !== e.target) {
    return;
  }
  backdrop.classList.add("backdrop--is-hidden");
  document.body.classList.remove("no-scroll");
  document.removeEventListener("keydown", onEscCloseForm);
};
const onEscCloseForm = ({ code }) => {
  if (code === "Escape") {
    backdrop.classList.add("backdrop--is-hidden");
    document.body.classList.remove("no-scroll");
    document.removeEventListener("keydown", onEscCloseForm);
    console.log("first");
  }
};
const openModal = (data) => {
  const { name, category, description, sizes, additives, price } = data;
  document.addEventListener("keydown", onEscCloseForm);
  backdrop.addEventListener("click", onClose);
  closeBtn.addEventListener("click", onClose);
  backdrop.classList.remove("backdrop--is-hidden");
  document.body.classList.add("no-scroll");
  imageWrap.innerHTML = markupImage(name, category);
  titleDrink.textContent = name;
  descriptionDrink.textContent = description;
  totalPrice.textContent = price;
  totalPriceForDrink.price = parseFloat(price);
  pickDrink.innerHTML = markupRadioBtn(sizes);
  pickAdditives.innerHTML = markupCheckBtn(additives);
};
pickDrink.addEventListener("change", () => {
  const addPrice = pickDrink.querySelector('input[name="pick-size"]:checked').value;
  totalPriceForDrink.size = parseFloat(addPrice);
  totalPrice.textContent = totalPriceForDrink.sum();
});
pickAdditives.addEventListener("change", () => {
  const selected = pickAdditives.querySelectorAll('input[name="pick-additives"]');
  let addForAdditives = 0;
  selected.forEach((check) => {
    if (check.checked)
      addForAdditives += parseFloat(check.value);
  });
  totalPriceForDrink.additives = addForAdditives;
  totalPrice.textContent = totalPriceForDrink.sum();
});
const gallery = document.querySelector(".gallery");
const filterList = document.querySelector(".filter");
const btnRefresh = document.querySelector(".btn--refresh");
let products = [];
let cardsForRender = null;
let refreshCounter = 1;
handleMenuToggle();
const visibleRefreshBtn = () => {
  if (cardsForRender.length <= refreshCounter) {
    btnRefresh.classList.add("is-active");
    return;
  }
  btnRefresh.classList.remove("is-active");
  refreshCounter = 1;
};
const renderCardsInGallery = () => {
  const cards = sortByValue(products, filterCategory(filterList));
  cardsForRender = renderCards(cards);
  refreshCounter = 1;
  gallery.innerHTML = cardsForRender[refreshCounter - 1];
  visibleRefreshBtn();
};
btnRefresh.addEventListener("click", () => {
  gallery.insertAdjacentHTML("beforeend", cardsForRender[refreshCounter]);
  refreshCounter += 1;
  visibleRefreshBtn();
});
fetch("./data/products.json").then((res) => res.json()).then((res) => {
  products.push(...res);
  renderCardsInGallery();
}).catch((error) => {
  console.error("Error fetching data:", error);
});
filterList.addEventListener("change", () => {
  renderCardsInGallery();
});
window.matchMedia("(min-width: 769px)").addEventListener("change", (e) => {
  if (e.matches || !e.matches)
    renderCardsInGallery();
});
const onCardClick = (e) => {
  const isCardProduct = e.target.closest("button");
  if (!isCardProduct) {
    return;
  }
  const drinkName = isCardProduct.dataset.card;
  const drinkData = products.find(({ name }) => name === drinkName);
  openModal(drinkData);
};
gallery.addEventListener("click", onCardClick);
