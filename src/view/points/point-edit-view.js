import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { bringFirstCharToUpperCase } from '../../utils/common.js';
import { bringToCommonEventDate, firstDateIsAfterSecond, CURRENT__DATE_SIMPLE, dateInPast, datesIsSame } from '../../utils/date.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const getCheckedAttribute = ({type, checked}) => (type === checked) ? 'checked' : '';
const getCheckedAttributeById = ({id, idsArr}) => idsArr.includes(id) ? 'checked' : '';

const createEventTypeItemsRepeatingTemplate = ({checkedType, typesList}) =>

  Object.keys(typesList).map((type) => (
    `<div class="event__type-item">
      <input id="event-type-${typesList[type]}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" 
        name="event-type" 
        value="${typesList[type]}" 
        ${getCheckedAttribute({checked: checkedType, type: typesList[type]})}
      >
      <label class="event__type-label 
        event__type-label--${typesList[type]}" 
        for="event-type-${typesList[type]}-1"
      >
        ${bringFirstCharToUpperCase(typesList[type])}
      </label>
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
    `<option data-destination-id="${destination.id}" 
      id="${bringFirstCharToUpperCase(destination.name)}" 
      value="${bringFirstCharToUpperCase(destination.name)}"
    ></option>`)
  ).join('');


const createEventFieldTemplate = ({checkedType, checkedDestination, destinationsList}) => (
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-1">
      ${bringFirstCharToUpperCase(checkedType)}
    </label>
    <input class="event__input 
      event__input--destination"
      id="event-destination-1" 
      type="text" 
      name="event-destination" 
      value="${bringFirstCharToUpperCase(checkedDestination.name)}" 
      list="destination-list-1"
    >
    <datalist id="destination-list-1">
        ${createEventFieldOptionsRepeatingTemplate({destinationsList})}
    </datalist>
  </div>`
);


const createTimeIntervalTemplate = ({dateFrom, dateTo}) => (
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input 
      class="event__input 
      event__input--time" 
      id="event-start-time-1" 
      type="text" 
      name="event-start-time"
      ${dateInPast(dateFrom) ? 'disabled' : ''} 
      value="${bringToCommonEventDate(dateFrom)}"
    >
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input 
      class="event__input 
      event__input--time" 
      id="event-end-time-1" 
      type="text" 
      name="event-end-time" 
      ${dateInPast(dateTo) ? 'disabled' : ''} 
      value="${bringToCommonEventDate(dateTo)}"
    >
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

const createOffersItemRepeatingTemplate = ({offersList, checkedOffersIds, checkedType}) => {
  const currentOfferByType = offersList.find((offerByType) => offerByType.type === checkedType);

  return (
    currentOfferByType.offers.map((offer) => (
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" 
            id="event-offer-${getLastWord(offer.title)}-1" 
            type="checkbox" 
            name="event-offer-${getLastWord(offer.title)}"
            data-offer-id="${offer.id}"
           ${getCheckedAttributeById({id: offer.id, idsArr: checkedOffersIds})}
      >
      <label class="event__offer-label" for="event-offer-${getLastWord(offer.title)}-1">
        <span class="event__offer-title">${bringFirstCharToUpperCase(offer.title)}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`)
    ).join('')
  );
};

const createOffersTemplate = ({offersList, checkedOffersIds, checkedType}) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    
    <div class="event__available-offers">

      ${createOffersItemRepeatingTemplate({offersList, checkedOffersIds, checkedType})}

    </div>
  </section>`
);


const createPhotoRepeatingTemplate = ({pictures}) =>
  pictures.map((picture) => (
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)
  ).join('');

const createDestinationPhotosTemplate = ({checkedDestination}) => {
  if (checkedDestination) {
    return (
      `<div class="event__photos-container">
        <div class="event__photos-tape">
          ${createPhotoRepeatingTemplate({pictures: checkedDestination.pictures})}
        </div>
      </div>`
    );
  }
};

const createDestinationTemplate = ({checkedDestination}) => (
  `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${checkedDestination.description}</p>

    ${ checkedDestination.pictures.length !== 0 ? createDestinationPhotosTemplate({checkedDestination}) : ''}

  </section>`
);

const createEventDetailsTemplate = ({checkedOffersIds, offersList, checkedDestination, checkedType}) =>
  (`<section class="event__details">
      
      ${ offersList.length !== 0 ? createOffersTemplate({checkedOffersIds, offersList, checkedType}) : ''}
      ${ checkedDestination !== '' ? createDestinationTemplate({checkedDestination}) : ''}

    </section>`);

const createPointChangeTemplate = ({
  basePrice,
  dateFrom,
  dateTo,
  checkedOffersIds,
  offersList,
  checkedType,
  typesList,
  checkedDestinationId,
  destinationsList
}) => {
  const checkedDestination = destinationsList.find((destination) => destination.id === checkedDestinationId);

  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
            ${createEventHeaderInfoTemplate({basePrice, dateFrom, dateTo, checkedType, typesList, checkedDestination, destinationsList})}
            ${createEventDetailsTemplate({checkedOffersIds, offersList, checkedDestination, checkedType})}            
        </form>

    </li>`
  );
};


export default class PointEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleEditClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({
    id,
    basePrice,
    dateFrom,
    dateTo,
    isFavorite,
    checkedOffersIds,
    offersList,
    checkedType,
    typesList,
    checkedDestinationId,
    destinationsList
  },
  {
    formSubmit,
    editClick
  }) {

    super();
    this._setState(PointEditView.parsePointToState({
      id,
      basePrice,
      dateFrom,
      dateTo,
      isFavorite,
      checkedOffersIds,
      offersList,
      checkedType,
      typesList,
      checkedDestinationId,
      destinationsList
    }));

    this.#handleFormSubmit = formSubmit;
    this.#handleEditClick = editClick;
    this._restoreHandlers();
  }

  get template() {
    return createPointChangeTemplate(this._state);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const sameDate = datesIsSame(this._state.dateFrom, this._state.dateFromBase) || datesIsSame(this._state.dateTo, this._state.dateToBase);
    this.#handleFormSubmit({updatedPoint: PointEditView.parseStateToPoint(this._state), resort: !sameDate});
  };

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('focusout', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationNameFillingHandler);

    if (this._state.offersList.length !== 0) {
      this.element.querySelector('.event__available-offers').addEventListener('change', this.#offersChangeHandler );
    }

    this.#setDatepickers();
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedType: evt.target.value,
    });
  };

  #offersChangeHandler = (evt) => {
    evt.preventDefault();
    const currentOfferId = Number(evt.target.dataset.offerId);

    const idIndex = this._state.checkedOffersIds.indexOf(currentOfferId);

    if (evt.target.checked && (idIndex === -1)){
      this._state.checkedOffersIds.push(currentOfferId);
      return;
    }

    if (!evt.target.checked && (idIndex !== -1)){
      this._state.checkedOffersIds.splice(idIndex, 1);
    }
  };


  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const currentDestinationOption = document.querySelector(`#destination-list-1 #${evt.target.value}`);

    this.updateElement({
      checkedDestinationId: currentDestinationOption.dataset.destinationId
    });
  };

  #getDestinationsByValue = (userDestinaton) => this._state.destinationsList.filter((destination) => Object.values(destination).includes(userDestinaton));

  #destinationNameFillingHandler = (evt) => {
    const userDestinaton = evt.target.value;
    evt.preventDefault();
    if(this.#getDestinationsByValue(userDestinaton).length === 0) {
      evt.target.value = '';
    }
  };

  #setDatepickers() {
    if (this._state.dateFrom && this._state.dateTo) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          time_24hr: true,
          minDate: CURRENT__DATE_SIMPLE,
          defaultDate: this._state.dateFrom,
          onClose: this.#dateFromCloseHandler
        },
      );
      this.#datepickerTo = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          time_24hr: true,
          minDate: this._state.dateFrom,
          defaultDate: this._state.dateTo,
          onClose: this.#dateToCloseHandler
        },
      );
    }
  }

  #dateFromCloseHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
      dateTo: firstDateIsAfterSecond(userDate, this._state.dateTo) ? userDate : this._state.dateTo
    });
  };

  #dateToCloseHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(
      PointEditView.parsePointToState(point)
    );
  }

  static parsePointToState(point) {
    return {
      ...point,
      dateFromBase: point.dateFrom,
      dateToBase: point.dateTo
    };
  }

  static parseStateToPoint(state) {
    const point = {
      id: state.id,
      basePrice: state.basePrice,
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
      destination: state.checkedDestinationId,
      isFavorite: state.isFavorite,
      offers: state.checkedOffersIds,
      type: state.checkedType
    };

    return point;
  }
}
