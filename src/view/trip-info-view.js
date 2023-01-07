import {createElement} from '../render';
import dayjs from 'dayjs';

const DATE_FORMAT_YEAR = 'YYYY';
const DATE_FORMAT_MONTH = 'MMM';
const DATE_FORMAT_DAY = 'D';

const getValidDateInRange = ({startDate, endDate}) => {

  let startDateYear = dayjs(startDate).format(DATE_FORMAT_YEAR);
  let endDateYear = dayjs(endDate).format(DATE_FORMAT_YEAR);
  const startDateMonth = dayjs(startDate).format(DATE_FORMAT_MONTH);
  const startDateDay = dayjs(startDate).format(DATE_FORMAT_DAY);
  const endDateDay = dayjs(endDate).format(DATE_FORMAT_DAY);
  let endDateMonth = dayjs(endDate).format(DATE_FORMAT_MONTH);

  if (startDateYear === endDateYear) {
    startDateYear = '';
    endDateYear = '';
    if (startDateMonth === endDateMonth) {
      endDateMonth = '';
    }
  }

  return `${startDateYear} ${startDateMonth} ${startDateDay} — ${endDateYear} ${endDateMonth} ${endDateDay}`;
};


const createTemplate = ({startDate, endDate, cost, destinations}) =>
  (
    `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destinations.join(' — ')}</h1>

      <p class="trip-info__dates">${getValidDateInRange({startDate, endDate})}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
    </p>
    </section>`
  );

export default class TripInfoView {

  constructor({startDate, endDate, cost, destinations}) {
    this.data = {
      startDate,
      endDate,
      cost,
      destinations
    };
  }

  getTemplate() {
    return createTemplate(this.data);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
