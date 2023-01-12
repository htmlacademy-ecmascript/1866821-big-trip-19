import AbstractView from '../../framework/view/abstract-view';
import { bringFirstCharToUpperCase } from '../../utils/common.js';
import { bringToCommonEventDate } from '../../utils/date.js';

const getCheckedAttribute = ({type, checked}) => (type === checked) ? 'checked' : '';
const getCheckedAttributeById = ({id, idArr}) => idArr.includes(id) ? 'checked' : '';

const createEventTypeItemsRepeatingTemplate = ({checkedType, typesList}) =>

  Object.keys(typesList).map((type) => (
    `<div class="event__type-item">
      <input id="event-type-${typesList[type]}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typesList[type]}" ${getCheckedAttribute({checked: checkedType, type: typesList[type]})}>
      <label class="event__type-label  event__type-label--${typesList[type]}" for="event-type-${typesList[type]}-1">${bringFirstCharToUpperCase(typesList[type])}</label>
    </div>`)
  ).join('');

const createEventTypeTemplate = ({checkedType, typesList}) => (
  `<div class="event__type-wrapper">
    <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${checkedType}.png" alt="Event type icon">
    </label>
    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

    <div class="event__type-list">
        <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>

          ${createEventTypeItemsRepeatingTemplate({checkedType, typesList})}

        </fieldset>
    </div>
  </div>`
);

const createEventFieldOptionsRepeatingTemplate = ({destinationsList}) =>

  Object.values(destinationsList).map((destination) => (
    `<option value="${bringFirstCharToUpperCase(destination.name)}"></option>`)
  ).join('');


const createEventFieldTemplate = ({checkedType, checkedDestination, destinationsList}) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${bringFirstCharToUpperCase(checkedType)}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${bringFirstCharToUpperCase(checkedDestination.name)}" list="destination-list-1">
    <datalist id="destination-list-1">
        ${createEventFieldOptionsRepeatingTemplate({destinationsList})}
    </datalist>
  </div>`
);


const createTimeIntervalTemplate = ({dateFrom, dateTo}) => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"value="${bringToCommonEventDate(dateFrom)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${bringToCommonEventDate(dateTo)}">
  </div>`
);

const createPriceTemplate = ({basePrice}) => (
  `<div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
  </div>`
);

const createHeaderBtnsTemplate = () => (
  `<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
  <button class="event__reset-btn" type="reset">Delete</button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>`
);

const createEventHeaderInfoTemplate = ({
  basePrice,
  dateFrom,
  dateTo,
  checkedType,
  typesList,
  checkedDestination,
  destinationsList}) =>
  (`<header class="event__header">
  
        ${createEventTypeTemplate({checkedType, typesList})}

        ${createEventFieldTemplate({checkedType, checkedDestination, destinationsList})}

        ${createTimeIntervalTemplate({dateFrom, dateTo})}

        ${createPriceTemplate({basePrice})}

        ${createHeaderBtnsTemplate()}

    </header>`);

const getLastWord = (str) => {
  const strAsArray = str.split(' ');
  return strAsArray[strAsArray.length - 1];
};

const createOffersItemRepeatingTemplate = ({offersList, checkedOffers}) => (
  Object.values(offersList).map((offer) => (
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" 
            id="event-offer-${getLastWord(offer.title)}-1" 
            type="checkbox" 
            name="event-offer-${getLastWord(offer.title)}"
           ${getCheckedAttributeById({id: offer.id, idArr: checkedOffers})}
      >
      <label class="event__offer-label" for="event-offer-${getLastWord(offer.title)}-1">
        <span class="event__offer-title">${bringFirstCharToUpperCase(offer.title)}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`)
  ).join('')
);

const createOffersTemplate = ({offersList, checkedOffers}) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    
    <div class="event__available-offers">

      ${createOffersItemRepeatingTemplate({offersList, checkedOffers})}

    </div>
  </section>`
);


const createPhotoRepeatingTemplate = ({pictures}) =>
  pictures.map((picture) => (
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)
  ).join('');

const createDestinationPhotosTemplate = ({checkedDestination}) => (
  `<div class="event__photos-container">
    <div class="event__photos-tape">
      ${createPhotoRepeatingTemplate({pictures: checkedDestination.pictures})}
    </div>
  </div>`
);

const createDestinationTemplate = ({checkedDestination}) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${checkedDestination.description}</p>

    ${ checkedDestination.pictures.length !== 0 ? createDestinationPhotosTemplate({checkedDestination}) : ''}

  </section>`
);

const createEventDetailsTemplate = ({checkedOffers, offersList, checkedDestination}) =>
  (`<section class="event__details">
      
      ${ offersList.length !== 0 ? createOffersTemplate({checkedOffers, offersList}) : ''}
      ${ checkedDestination !== '' ? createDestinationTemplate({checkedDestination}) : ''}

    </section>`);

const createPointChangeTemplate = ({
  basePrice,
  dateFrom,
  dateTo,
  checkedOffers,
  offersList,
  checkedType,
  typesList,
  checkedDestination,
  destinationsList
}) =>
  (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
            ${createEventHeaderInfoTemplate({basePrice, dateFrom, dateTo, checkedType, typesList, checkedDestination, destinationsList})}
            ${createEventDetailsTemplate({checkedOffers, offersList, checkedDestination})}            
        </form>

    </li>`
  );


export default class PointEditView extends AbstractView {
  #data = null;
  #handleFormSubmit = null;
  #handleEditClick = null;

  constructor({
    basePrice,
    dateFrom,
    dateTo,
    isFavorite,
    checkedOffers,
    offersList,
    checkedType,
    typesList,
    checkedDestination,
    destinationsList
  },
  {
    onFormSubmit,
    onEditClick
  }) {
    super();

    this.#data = {
      basePrice,
      dateFrom,
      dateTo,
      isFavorite,
      checkedOffers,
      offersList,
      checkedType,
      typesList,
      checkedDestination,
      destinationsList
    };

    this.#handleFormSubmit = onFormSubmit;
    this.#handleEditClick = onEditClick;

    this.element.querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  get template() {
    return createPointChangeTemplate(this.#data);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(this.#data);
  };
}
