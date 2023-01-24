import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isLeapYear from 'dayjs/plugin/isLeapYear';
dayjs.extend(duration);
dayjs.extend(isLeapYear);

const CURRENT_DATE = dayjs();
const CURRENT__DATE_SIMPLE = new Date();

const DATE_FORMAT_VIEW = 'YYYY MMM D';
const DATE_FORMAT_SIMPLE = 'YYYY-MM-DD';
const DATE_FORMAT_LONG = 'YYYY-MM-DDTHH:mm';
const DATE_FORMAT_TIME = 'HH:mm';
const DATE_FORMAT_COMMON = 'DD/MM/YY HH:mm';

const YearDaysNumber = {
  SIMPLE: 365,
  LEAP: 366,
  MIDDLE: 365.2,
};

const YEAR_MONTHS_NUMBER = 12;

const firstDateIsAfterSecond = (firstDate, secondDate) => (firstDate && secondDate) ? dayjs(firstDate).isAfter(secondDate) : '';
const bringToShortEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_VIEW) : '';
const bringToSimpleEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_SIMPLE) : '';
const bringToLongEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_LONG) : '';
const bringToTimeEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_TIME) : '';
const bringToCommonEventDate = (date) => date ? dayjs(date).format(DATE_FORMAT_COMMON) : '';

const getDidderence = (firstDate, secondDate) => {

  let daysNumber = YearDaysNumber.SIMPLE;

  if (dayjs(firstDate).isLeapYear() || dayjs(firstDate).isLeapYear()) {
    daysNumber = YearDaysNumber.MIDDLE;
  }

  if (dayjs(firstDate).isLeapYear() && dayjs(firstDate).isLeapYear()) {
    daysNumber = YearDaysNumber.LEAP;
  }

  dayjs.duration({ months: YEAR_MONTHS_NUMBER, days: daysNumber });

  return dayjs.duration(dayjs(secondDate).diff(firstDate));
};

const getTimeDifference = ({firstDate, secondDate, isSimple = false}) => {
  if (!firstDate || !secondDate) {
    return '';
  }

  if (isSimple) {
    return dayjs(secondDate).diff(dayjs(firstDate), 'minutes');
  }

  const difference = getDidderence(firstDate, secondDate);

  const minutesDifference = difference.$d.minutes !== 0 ? `${difference.$d.minutes}m` : '';
  const hoursDifference = difference.$d.hours !== 0 ? `${difference.$d.hours}h` : '';
  const daysDifference = difference.$d.days !== 0 ? `${difference.$d.days}d` : '';
  const monthsDifference = difference.$d.months !== 0 ? `${difference.$d.months}mo` : '';
  const yearsDifference = difference.$d.years !== 0 ? `${difference.$d.years}y` : '';


  return `${yearsDifference} ${monthsDifference} ${daysDifference} ${hoursDifference} ${minutesDifference}`;

};

const dateInPast = (date) => dayjs(date).isBefore(CURRENT_DATE);
const dateInFuture = (date) => dayjs(date).isAfter(CURRENT_DATE);
const dateInPresent = (startDate, endDate) => (
  (dateInPast(startDate) || dayjs(startDate).isSame(CURRENT_DATE)) &&
  (dateInFuture(endDate) || dayjs(endDate).isSame(CURRENT_DATE))
);
const datesIsSame = (firstDate, secondDate) => dayjs(firstDate).isSame(dayjs(secondDate));

export {
  datesIsSame,
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
  CURRENT__DATE_SIMPLE
};
