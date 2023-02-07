import dayjs from 'dayjs';
import { getTimeDifference } from './date';

const sortPointsDayUp = (firstPoint, secondPoint) => dayjs(firstPoint.dateFrom).diff(dayjs(secondPoint.dateFrom));

const sortPointsPriceDown = (firstPoint, secondPoint) => (secondPoint.basePrice - firstPoint.basePrice);


const sortPointsDurationDown = (firstPoint, secondPoint) => {
  const firstPointDuration = getTimeDifference(
    {
      firstDate: firstPoint.dateFrom,
      secondDate: firstPoint.dateTo,
      isSimple: true
    }
  );

  const secondPointDuration = getTimeDifference(
    {
      firstDate: secondPoint.dateFrom,
      secondDate: secondPoint.dateTo,
      isSimple: true
    }
  );
  return secondPointDuration - firstPointDuration;
};

export {
  sortPointsDayUp,
  sortPointsPriceDown,
  sortPointsDurationDown
};
