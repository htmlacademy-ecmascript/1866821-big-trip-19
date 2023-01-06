import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offer.js';
import { mockOffersByType } from '../mock/offersByType.js';
import { PointModelType, PointTypes } from '../const/point.js';

export class PointModel {
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
      destination: this.#getDestinationTitle(destination),
      isFavorite,
      offers: this.#getOffers(offers),
      type
    };
    this.changeData = {
      basePrice,
      dateFrom,
      dateTo,
      checkedOffers: offers,
      offersList: this.#getTypeOffersList(type),
      checkedType: type,
      typesList: PointTypes,
      checkedDestination: this.#getFullDestination(destination),
      destinationsList: this.#getDestinationsList(),
    };
  }


  #getDestinationTitle(id) {
    const pointDestination = mockDestinations.find( (destination) => destination.id === id );
    if (pointDestination !== undefined) {
      return pointDestination.name;
    }
    return '';
  }

  #getFullDestination(id) {
    const pointDestination = mockDestinations.find( (destination) => destination.id === id );
    if (pointDestination !== undefined) {
      return pointDestination;
    }
    return {};
  }

  #getDestinationsList() {
    return mockDestinations;
  }

  #getTypeOffersList(type) {
    const offerByType = mockOffersByType.find( (offerBytype) => offerBytype.type === type );
    if (offerByType !== undefined) {
      return offerByType.offers;
    }
    return [];
  }

  #getOffers(idsList) {
    return mockOffers.filter((offer) => idsList.includes(offer.id));
  }

  getData(modelType) {
    if (modelType === PointModelType.ADD) {
      return this.changeData;
    }
    if (modelType === PointModelType.ADD_WITHOUT_DESTINATONS) {
      const clone = Object.assign({}, this.changeData);
      clone.destinationsList = [];
      clone.checkedDestination = '';
      return clone;
    }
    if (modelType === PointModelType.ADD_WITHOUT_OFFERS) {
      const clone = Object.assign({}, this.changeData);
      clone.offersList = [];
      clone.checkedOffers = [];
      return clone;
    }
    if (modelType === PointModelType.EDIT) {
      const clone = Object.assign({}, this.changeData);
      return clone;
    }
    return this.data;
  }
}
