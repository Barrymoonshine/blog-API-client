export const saveItem = (itemName, value) => {
  localStorage.setItem(itemName, JSON.stringify(value));
};

export const getItem = (itemName) => JSON.parse(localStorage.getItem(itemName));

export const removeItem = (itemName) => {
  localStorage.removeItem(itemName);
};
