import dayjs from 'dayjs';

const DATE_FORMAT_VIEW = 'MMM D';
const DATE_FORMAT_SIMPLE = 'YYYY-MM-DD';
const DATE_FORMAT_LONG = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT_MINUTES = 'mm';
const DATE_FORMAT_HOURS = 'HH';
const DATE_FORMAT_COMMON = 'DD/MM/YY HH:mm';

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const bringToShortEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_VIEW) : '';
const bringToSimpleEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_SIMPLE) : '';
const bringToLongEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_LONG) : '';
const bringToTimeEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_TIME) : '';
const bringToCommonEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_COMMON) : '';
const getTimeDifference = ({firstDate, secondDate}) => {
  if (!firstDate || !secondDate) {
    return '';
  }

  const secondAsMinute = dayjs(secondDate).format(DATE_FORMAT_MINUTES);
  const firstAsMinute = dayjs(firstDate).format(DATE_FORMAT_MINUTES);

  const secondAsHours = dayjs(secondDate).format(DATE_FORMAT_HOURS);
  const firstAsHours = dayjs(firstDate).format(DATE_FORMAT_HOURS);

  const hoursResult = secondAsHours - firstAsHours;
  const minutesResult = secondAsMinute > firstAsMinute ? secondAsMinute - firstAsMinute : firstAsMinute - secondAsMinute;

  if (hoursResult === 0) {
    return `${minutesResult}m`;
  }

  if (minutesResult === 0) {
    return `${hoursResult}h`;
  }

  if (hoursResult === 0 && minutesResult === 0) {
    return '00H00M';
  }

  return `${hoursResult}h ${minutesResult}m`;

};


const bringFirstCharToUpperCase = (inputString) => {
  if (!inputString) {
    return inputString;
  }
  return inputString[0].toUpperCase() + inputString.slice(1);
};

export {
  getRandomArrayElement,
  bringToShortEventDate,
  bringToSimpleEventDate,
  bringToLongEventDate,
  bringFirstCharToUpperCase,
  bringToTimeEventDate,
  getTimeDifference,
  bringToCommonEventDate
};
