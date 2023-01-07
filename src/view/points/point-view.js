import {createElement} from '../../render.js';
import {
  bringFirstCharToUpperCase,
  bringToShortEventDate,
  bringToLongEventDate,
  bringToSimpleEventDate,
  bringToTimeEventDate,
  getTimeDifference
} from '../../utils.js';


const createOffersItemRepeatingTemplate = (offersData) =>
  offersData.map((offer) => (
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`)
  ).join('');

const createOffersListTemplate = (offersData) =>
  (`<ul class="event__selected-offers">
  ${createOffersItemRepeatingTemplate(offersData)}
</ul>`);

const createEventDateTemplate = (date) =>
  (`<time class="event__date" datetime="${bringToSimpleEventDate(date)}">${bringToShortEventDate(date)}</time>`);


const createTypeIconTemplate = (type) =>
  (`<div class="event__type">
  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>`);

const createShedulerTemplate = ({dateFrom, dateTo}) =>
  (`<div class="event__schedule">
    <p class="event__time">
    <time class="event__start-time" datetime="${bringToLongEventDate(dateFrom)}">${bringToTimeEventDate(dateFrom)}</time>
    &mdash;
    <time class="event__end-time" datetime="${bringToLongEventDate(dateTo)}">${bringToTimeEventDate(dateTo)}</time>
    </p>
    <p class="event__duration">${getTimeDifference({firstDate: dateFrom, secondDate: dateTo})}</p>
  </div>`);

const getFavoriteActiveClass = (isFavorite) => isFavorite ? 'event__favorite-btn--active' : '';

const createIsFavoriteBtnTemplate = (isFavorite) =>
  (`<button class="event__favorite-btn ${getFavoriteActiveClass(isFavorite)}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
</button>`);


const createRollupBtnTemplate = () =>
  (`<button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`);

const createListTemplate = ({
  basePrice,
  dateFrom,
  dateTo,
  destination,
  isFavorite,
  offers,
  type
}) =>
  (
    `<li class="trip-events__item">
        <div class="event">
          ${createEventDateTemplate(dateFrom)}
          ${createTypeIconTemplate(type)}
          <h3 class="event__title">${bringFirstCharToUpperCase(type)} ${bringFirstCharToUpperCase(destination)}</h3>
          ${createShedulerTemplate({dateFrom, dateTo})}
          
          <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          ${createOffersListTemplate(offers)}
          ${createIsFavoriteBtnTemplate(isFavorite)}
          ${createRollupBtnTemplate()}
        </div>
    </li>`
  );


export default class PointView {

  constructor({
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type
  }) {

    this.data = {
      basePrice,
      dateFrom,
      dateTo,
      destination,
      isFavorite,
      offers,
      type
    };
  }

  getTemplate() {
    return createListTemplate(this.data);
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
