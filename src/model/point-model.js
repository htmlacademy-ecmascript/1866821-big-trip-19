import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offer.js';
import { mockOffersByType } from '../mock/offersByType.js';
import { PointTypes } from '../const/point.js';

export class PointModel {
  #previewData = null;
  #fullData = null;

  constructor({
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type
  }) {
    this.#previewData = {
      basePrice,
      dateFrom,
      dateTo,
      destination: this.#getDestinationTitle(destination),
      isFavorite,
      offers: this.#getOffers(offers),
      type
    };
    this.#fullData = {
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
    return pointDestination ? pointDestination.name : '';
  }

  #getFullDestination(id) {
    const pointDestination = mockDestinations.find( (destination) => destination.id === id );
    return pointDestination ? pointDestination : {};
  }

  #getDestinationsList() {
    return mockDestinations;
  }

  #getTypeOffersList(type) {
    const offerByType = mockOffersByType.find( (offerBytype) => offerBytype.type === type );
    return offerByType ? offerByType.offers : [];
  }

  #getOffers(idsList) {
    return mockOffers.filter((offer) => idsList.includes(offer.id));
  }


  get previewData() {
    return this.#previewData;
  }

  get fullData() {
    return this.#fullData;
  }

}
