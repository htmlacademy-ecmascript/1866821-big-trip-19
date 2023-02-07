import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { bringFirstCharToUpperCase } from '../../utils/common.js';
import { bringToCommonEventDate, firstDateIsAfterSecond, CURRENT_DATE_SIMPLE } from '../../utils/date.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { DEFAULT_POINT_ID } from '../../const/point.js';
import he from 'he';

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
      value="${bringFirstCharToUpperCase(checkedDestination ? checkedDestination.name : '')}" 
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
    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
  </div>`
);

const createHeaderBtnsTemplate = ({id, isSaving, isDeleting, isDisabled}) => (
  `<button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
     ${isSaving ? 'Saving...' : 'Save'}
   </button>
   <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
     ${id === DEFAULT_POINT_ID ? 'Cancel' : `${isDeleting ? 'Deleting...' : 'Delete'}`}
   </button>
   <button class="event__rollup-btn" type="button" ${isDisabled ? 'disabled' : ''}>
    <span class="visually-hidden">Open event</span>
  </button>`
);

const createEventHeaderInfoTemplate = ({
  id,
  basePrice,
  dateFrom,
  dateTo,
  checkedType,
  typesList,
  checkedDestination,
  destinationsList,
  isSaving,
  isDeleting,
  isDisabled
}) =>
  (`<header class="event__header">
  
        ${createEventTypeTemplate({checkedType, typesList})}

        ${createEventFieldTemplate({checkedType, checkedDestination, destinationsList})}

        ${createTimeIntervalTemplate({dateFrom, dateTo})}

        ${createPriceTemplate({basePrice})}

        ${createHeaderBtnsTemplate({id, isSaving, isDeleting, isDisabled})}

    </header>`);

const getLastWord = (str) => {
  const strAsArray = str.split(' ');
  return strAsArray[strAsArray.length - 1];
};

const createOffersItemRepeatingTemplate = ({offersList, checkedOffersIds, checkedType, isDisabled}) => {
  const currentOfferByType = offersList.find((offerByType) => offerByType.type === checkedType);

  return (
    currentOfferByType.offers.map((offer) => (
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" 
            id="event-offer-${offer.id}-${getLastWord(offer.title)}-1" 
            type="checkbox" 
            name="event-offer-${offer.id}-${getLastWord(offer.title)}"
            data-offer-id="${offer.id}"
            ${isDisabled ? 'disabled' : ''}
           ${getCheckedAttributeById({id: offer.id, idsArr: checkedOffersIds})}
      >
      <label class="event__offer-label" for="event-offer-${offer.id}-${getLastWord(offer.title)}-1">
        <span class="event__offer-title">${bringFirstCharToUpperCase(offer.title)}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`)
    ).join('')
  );
};

const createOffersTemplate = ({offersList, checkedOffersIds, checkedType, isDisabled}) => (
  `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    
    <div class="event__available-offers">

      ${createOffersItemRepeatingTemplate({offersList, checkedOffersIds, checkedType, isDisabled})}

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

const createEventDetailsTemplate = ({checkedOffersIds, offersList, checkedDestination, checkedType, isDisabled}) => {
  const offersOfType = offersList.find((offersItem) => offersItem.type === checkedType).offers;
  return (`<section class="event__details">

      ${offersOfType.length !== 0 ? createOffersTemplate({checkedOffersIds, offersList, checkedType, isDisabled}) : ''}
      ${checkedDestination ? createDestinationTemplate({checkedDestination}) : ''}

    </section>`);
};

const createPointChangeTemplate = ({
  id,
  basePrice,
  dateFrom,
  dateTo,
  checkedOffersIds,
  offersList,
  checkedType,
  typesList,
  checkedDestinationId,
  destinationsList,
  isSaving,
  isDeleting,
  isDisabled
}) => {
  const checkedDestination = destinationsList.find((destination) => destination.id === Number(checkedDestinationId));
  return (
    `<li class="trip-events__item">
        <form class="event event--edit" action="#" method="post">
    ${createEventHeaderInfoTemplate({
      basePrice,
      dateFrom,
      dateTo,
      checkedType,
      typesList,
      checkedDestination,
      destinationsList,
      id,
      isSaving,
      isDeleting,
      isDisabled
    })}
    ${createEventDetailsTemplate({
      checkedOffersIds,
      offersList,
      checkedDestination,
      checkedType,
      isDisabled
    })}            
        </form>
    </li>`
  );
};

export default class PointEditView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #handleEditClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;

  constructor({
    id = DEFAULT_POINT_ID,
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
    editClick,
    deleteClick
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
    this.#handleDeleteClick = deleteClick;
    this._restoreHandlers();
  }

  get template() {
    return createPointChangeTemplate(this._state);
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('focusout', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationNameFillingHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    if (this._state.offersList.length !== 0) {
      const offersOfType = this.element.querySelector('.event__available-offers');
      if (offersOfType) {
        offersOfType.addEventListener('change', this.#offersChangeHandler );
      }
    }

    this.#setDatepickers();
  }

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

  #setDatepickers() {
    if (this._state.dateFrom && this._state.dateTo) {
      this.#datepickerFrom = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          minDate: CURRENT_DATE_SIMPLE,
          defaultDate: this._state.dateFrom,
          onChange: this.#dateFromChangeHandler
        },
      );
      this.#datepickerTo = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          dateFormat: 'd/m/y H:i',
          enableTime: true,
          minDate: this._state.dateFrom,
          defaultDate: this._state.dateTo,
          onChange: this.#dateToChangeHandler
        },
      );
    }
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      checkedType: evt.target.value,
      checkedOffersIds: []
    });
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();

    let priceAsNumber = Math.round(Number(he.encode(evt.target.value)));

    if (evt.target.value === '') {
      evt.target.value = this._state.basePrice;
      return;
    }

    if (priceAsNumber <= 0) {
      evt.target.value = '1';
      priceAsNumber = 1;
    }

    this._setState({
      basePrice: `${priceAsNumber}`,
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

    const destinationValue = he.encode(evt.target.value);

    if (destinationValue === '') {
      const checkedDestination = this._state.destinationsList.find((destination) => destination.id === Number(this._state.checkedDestinationId));
      if (!checkedDestination) {
        return;
      }
      evt.target.value = he.encode(checkedDestination.name);
      return;
    }

    const currentDestinationOption = document.querySelector(`#destination-list-1 #${destinationValue}`);

    this._setState({
      checkedDestinationId: currentDestinationOption.dataset.destinationId,
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

  #dateFromChangeHandler = ([userDate]) => {
    this._setState({
      dateFrom: userDate,
    });
    this.#datepickerTo.set('minDate', userDate);
    if(firstDateIsAfterSecond(userDate, this._state.dateTo)) {
      this._setState({
        dateTo: userDate,
      });
      this.#datepickerTo.setDate(userDate);
    }
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState({
      dateTo: userDate,
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
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

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
