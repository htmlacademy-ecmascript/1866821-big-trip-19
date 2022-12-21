import dayjs from 'dayjs';

const DATE_FORMAT = 'D MMMM';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const humanizeEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT) : '';

const bringFirstCharToUpperCase = (inputString) => {
  if (!inputString) {
    return inputString;
  }
  return inputString[0].toUpperCase() + inputString.slice(1);
};

export {getRandomArrayElement, humanizeEventDate, bringFirstCharToUpperCase};
