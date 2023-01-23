import { mockDestinations } from '../mock/destination.js';

import { PointTypes } from '../const/point.js';

export class PointModel {
  #previewData = null;
  #fullData = null;

  constructor({
    id,
    basePrice,
    dateFrom,
    dateTo,
    destination,
    isFavorite,
    offers,
    type
  },
  offersData,
  destinationsList
  ) {
    this.#previewData = {
      id,
      basePrice,
      dateFrom,
      dateTo,
      destination: this.#getDestinationTitle(destination),
      isFavorite,
      offers: this.#getOffers({
        checkedOffersIds: offers,
        offersList: offersData.offers
      }),
      type
    };
    this.#fullData = {
      id,
      basePrice,
      dateFrom,
      dateTo,
      isFavorite,
      checkedOffersIds: offers,
      offersList: offersData.offersByType,
      checkedType: type,
      typesList: PointTypes,
      checkedDestinationId: destination,
      destinationsList
    };
  }

  #getDestinationTitle(id) {
    const pointDestination = mockDestinations.find( (destination) => destination.id === id );
    return pointDestination ? pointDestination.name : '';
  }

  #getOffers({checkedOffersIds, offersList}) {
    return offersList.filter((offer) => checkedOffersIds.includes(offer.id));
  }

  get previewData() {
    return this.#previewData;
  }

  get fullData() {
    return this.#fullData;
  }

}
