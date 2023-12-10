export const markupRadioBtn = (sizes) => {
  const keysSize = Object.keys(sizes);

  return keysSize
    .map((key) => {
      const conditions = sizes[key];

      const checked = keysSize.indexOf(key) === 0 ? 'checked' : '';

      return `<label class="pick__label" aria-labelledby="${key.toLowerCase()}-size">
                  <input type="radio" name="pick-size" class="pick__check"
                  value="${conditions['add-price']}" ${checked} />

                  <span class="pick__type pick__type--radio">
                    <span class="pick__icon">${key.toUpperCase()}</span>
                    <span class="pick__description" id="${key.toLowerCase()}-size">${
        conditions.size
      }</span>
                  </span>
                </label>`;
    })
    .join('');
};
