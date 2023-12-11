export const markupCheckBtn = (additives) => {
  let counter = 0;
  return additives
    .map((item) => {
      counter += 1;

      return `<label class="pick__label" aria-labelledby="${item.name.toLowerCase()}-label">
                <input type="checkbox" name="pick-additives" class="pick__check"
                value="${item['add-price']}" />

                <span class="pick__type">
                  <span class="pick__icon">${counter}</span>
                  <span class="pick__description" id="${item.name.toLowerCase()}-label">
                  ${item.name}</span>
                </span>
              </label>`;
    })
    .join('');
};
