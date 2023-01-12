import dayjs from 'dayjs';

const HOUR_MINUTES_INDEX = 60;
const CURRENT_DATE = dayjs();

const DATE_FORMAT_VIEW = 'MMM D';
const DATE_FORMAT_SIMPLE = 'YYYY-MM-DD';
const DATE_FORMAT_LONG = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT_MINUTES = 'mm';
const DATE_FORMAT_HOURS = 'HH';
const DATE_FORMAT_COMMON = 'DD/MM/YY HH:mm';

const bringToShortEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_VIEW) : '';
const bringToSimpleEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_SIMPLE) : '';
const bringToLongEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_LONG) : '';
const bringToTimeEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_TIME) : '';
const bringToCommonEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_COMMON) : '';
const getTimeDifference = ({firstDate, secondDate, inMinutes = false}) => {
  if (!firstDate || !secondDate) {
    return '';
  }

  const secondAsMinute = dayjs(secondDate).format(DATE_FORMAT_MINUTES);
  const firstAsMinute = dayjs(firstDate).format(DATE_FORMAT_MINUTES);

  const secondAsHours = dayjs(secondDate).format(DATE_FORMAT_HOURS);
  const firstAsHours = dayjs(firstDate).format(DATE_FORMAT_HOURS);

  const hoursResult = secondAsHours - firstAsHours;
  const minutesResult = secondAsMinute > firstAsMinute ? secondAsMinute - firstAsMinute : firstAsMinute - secondAsMinute;

  if (inMinutes) {
    return (hoursResult * HOUR_MINUTES_INDEX) + minutesResult;
  }

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

const dateInPast = (date) => dayjs(date).isBefore(CURRENT_DATE);
const dateInFuture = (date) => dayjs(date).isAfter(CURRENT_DATE);
const dateInPresent = (startDate, endDate) => (
  (dateInPast(startDate) || dayjs(startDate).isSame(CURRENT_DATE)) &&
  (dateInFuture(endDate) || dayjs(endDate).isSame(CURRENT_DATE))
);

export {
  dateInPast,
  dateInFuture,
  dateInPresent,
  bringToShortEventDate,
  bringToSimpleEventDate,
  bringToLongEventDate,
  bringToTimeEventDate,
  getTimeDifference,
  bringToCommonEventDate
};
