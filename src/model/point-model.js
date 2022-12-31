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
    this.ChangeData = {
      basePrice,
      dateFrom,
      dateTo,
      checkedOffers: offers.map((id) => id),
      offersList: this.#getTypeOffersList(type),
      checkedType: type,
      typesList: PointTypes,
      checkedDestination: this.#getFullDestination(destination),
      destinationsList: this.#getDestinationsList(),
    };
  }


  #getDestinationTitle(id) {
    let name = '';
    mockDestinations.forEach((destination) => {
      if (destination.id === id) {
        name = destination.name;
      }
    });
    return name;
  }

  #getFullDestination(id) {
    let fullDestination = {};
    mockDestinations.forEach((destination) => {
      if (destination.id === id) {
        fullDestination = destination;
      }
    });
    return fullDestination;
  }

  #getDestinationsList() {
    return mockDestinations;
  }

  #getTypeOffersList(type) {
    let offers = [];
    mockOffersByType.forEach((offerBytype) => {
      if (offerBytype.type === type) {
        offers = offerBytype.offers;
      }
    });
    return offers;
  }

  #getOffers(idList) {
    const offers = [];
    idList.forEach((id) => {
      mockOffers.map( (offer) => {
        if (offer.id === id) {
          offers.push({
            title: offer.title,
            price: offer.price
          });
        }
      });
    });
    return offers;
  }

  getData(modelType) {
    if (modelType === PointModelType.ADD) {
      return this.ChangeData;
    }
    if (modelType === PointModelType.ADD_WITHOUT_DESTINATONS) {
      const clone = Object.assign({}, this.ChangeData);
      clone.destinationsList = [];
      clone.checkedDestination = '';
      return clone;
    }
    if (modelType === PointModelType.ADD_WITHOUT_OFFERS) {
      const clone = Object.assign({}, this.ChangeData);
      clone.offersList = [];
      clone.checkedOffers = [];
      return clone;
    }
    if (modelType === PointModelType.EDIT) {
      const clone = Object.assign({}, this.ChangeData);
      return clone;
    }
    return this.data;
  }
}
