import AbstractView from '../framework/view/abstract-view';
import dayjs from 'dayjs';

const DATE_FORMAT_YEAR = 'YYYY';
const DATE_FORMAT_MONTH = 'MMM';
const DATE_FORMAT_DAY = 'D';
const VISIBLE_DESTINATIONS_LIMIT = 3;

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

const getDestinationBorders = (destinationsTitles) => {
  if(destinationsTitles.length > VISIBLE_DESTINATIONS_LIMIT) {
    return `${destinationsTitles[0]} — ... — ${destinationsTitles[destinationsTitles.length - 1]}`;
  }
  return `${destinationsTitles.join(' — ')}`;
};


const createTemplate = ({startDate, endDate, cost, destinationsTitles}) =>
  (
    `<section class="trip-main__trip-info trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getDestinationBorders(destinationsTitles)}</h1>

        <p class="trip-info__dates">${getValidDateInRange({startDate, endDate})}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
      </p>
    </section>`
  );

export default class TripInfoView extends AbstractView {
  #data = null;

  constructor({
    startDate,
    endDate,
    cost,
    destinationsTitles
  }) {
    super();

    this.#data = {
      startDate,
      endDate,
      cost,
      destinationsTitles
    };
  }

  get template() {
    return createTemplate(this.#data);
  }
}
