import dayjs from 'dayjs';
import { getTimeDifference } from './date';

function sortPointsDayDown(firstPoint, secondPoint) {
  return dayjs(secondPoint.dateFrom).diff(dayjs(firstPoint.dateFrom));
}

function sortPointsPriceDown(firstPoint, secondPoint) {
  return secondPoint.basePrice - firstPoint.basePrice;
}

function sortPointsDurationDown(firstPoint, secondPoint) {
  const firstPointDuration = getTimeDifference(
    {
      firstDate: firstPoint.dateFrom,
      secondDate: firstPoint.dateTo,
      inMinutes: true
    }
  );

  const seconfPointDuration = getTimeDifference(
    {
      firstDate: secondPoint.dateFrom,
      secondDate: secondPoint.dateTo,
      inMinutes: true
    }
  );

  return seconfPointDuration - firstPointDuration;
}

export {
  sortPointsDayDown,
  sortPointsPriceDown,
  sortPointsDurationDown
};
