export const filterCategory = (el) => el.querySelector('input[name="filter__check"]:checked').value;

export const sortByValue = (data, value) => data.filter((items) => items.category === value);
