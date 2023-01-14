const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const bringFirstCharToUpperCase = (inputString) => {
  if (!inputString) {
    return inputString;
  }
  return inputString[0].toUpperCase() + inputString.slice(1);
};

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

export {
  updateItem,
  getRandomArrayElement,
  bringFirstCharToUpperCase
};
