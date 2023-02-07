import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isLeapYear from 'dayjs/plugin/isLeapYear';
dayjs.extend(duration);
dayjs.extend(isLeapYear);

const CURRENT_DATE = dayjs();
const CURRENT_DATE_SIMPLE = new Date();

const DATE_FORMAT_VIEW = 'MMM DD';
const DATE_FORMAT_SIMPLE = 'YYYY-MM-DD';
const DATE_FORMAT_LONG = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT_COMMON = 'DD/MM/YY HH:mm';

const DateWithZeroLimit = 10;

const firstDateIsAfterSecond = (firstDate, secondDate) => (firstDate && secondDate) ? dayjs(firstDate).isAfter(secondDate) : '';
const bringToShortEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_VIEW) : '';
const bringToSimpleEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_SIMPLE) : '';
const bringToLongEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_LONG) : '';
const bringToTimeEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_TIME) : '';
const bringToCommonEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_COMMON) : '';

const getFormatDuration = (dateAsNumber) => dateAsNumber < DateWithZeroLimit ? `0${dateAsNumber}` : `${dateAsNumber}`;

const getTimeDifference = ({firstDate, secondDate, isSimple = false}) => {
  if (!firstDate || !secondDate) {
    return '';
  }

  if (isSimple) {
    return dayjs(secondDate).diff(dayjs(firstDate), 'minutes');
  }

  const difference = dayjs.duration(dayjs(secondDate).diff(firstDate));

  const minutesDifference = difference.$d.minutes !== 0 ? `${getFormatDuration(difference.$d.minutes)}m` : '';
  const hoursDifference = difference.$d.hours !== 0 ? `${getFormatDuration(difference.$d.hours)}h` : '';
  const daysDifference = difference.$d.days !== 0 ? `${getFormatDuration(difference.$d.days)}d` : '';
  const monthsDifference = difference.$d.months !== 0 ? `${getFormatDuration(difference.$d.months)}mo` : '';
  const yearsDifference = difference.$d.years !== 0 ? `${getFormatDuration(difference.$d.years)}y` : '';

  const resultDate = `${yearsDifference} ${monthsDifference} ${daysDifference} ${hoursDifference} ${minutesDifference}`;

  if (resultDate.trim() === '') {
    return '00m';
  }

  return resultDate;

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
  firstDateIsAfterSecond,
  bringToShortEventDate,
  bringToSimpleEventDate,
  bringToLongEventDate,
  bringToTimeEventDate,
  getTimeDifference,
  bringToCommonEventDate,
  CURRENT_DATE_SIMPLE
};
