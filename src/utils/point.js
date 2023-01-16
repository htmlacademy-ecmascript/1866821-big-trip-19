import dayjs from 'dayjs';
import { getTimeDifference } from './date';

const sortPointsDayDown = (firstPoint, secondPoint) => dayjs(secondPoint.dateFrom).diff(dayjs(firstPoint.dateFrom));

const sortPointsPriceDown = (firstPoint, secondPoint) => (secondPoint.basePrice - firstPoint.basePrice);


const sortPointsDurationDown = (firstPoint, secondPoint) => {
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
};

export {
  sortPointsDayDown,
  sortPointsPriceDown,
  sortPointsDurationDown
};
