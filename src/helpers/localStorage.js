export const saveItem = (itemName, value) => {
  localStorage.setItem(itemName, JSON.stringify(value));
};

export const getItem = (item) => JSON.parse(localStorage.getItem(item));
