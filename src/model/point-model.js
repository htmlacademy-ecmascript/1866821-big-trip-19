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
  offersByType,
  destinationsList
  ) {
    this.#previewData = {
      id,
      basePrice,
      dateFrom,
      dateTo,
      destination: this.#getDestinationTitle(destination, destinationsList),
      isFavorite,
      offers: this.#getOffers({
        checkedOffersIds: offers,
        offersByType,
        type
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
      offersList: offersByType,
      checkedType: type,
      typesList: PointTypes,
      checkedDestinationId: destination ? destination : '',
      destinationsList
    };
  }

  #getDestinationTitle(id, destinationsList) {
    const pointDestination = destinationsList.find((destination) => destination.id === Number(id));

    return pointDestination ? pointDestination.name : '';
  }

  #getOffers({checkedOffersIds, offersByType, type}) {
    const allOffersListOfType = offersByType.find((offerByType) => type === offerByType.type).offers;
    const checkedOffersListOfType = allOffersListOfType.filter((offer) => checkedOffersIds.includes(offer.id));

    return checkedOffersListOfType;
  }

  get previewData() {
    return this.#previewData;
  }

  get fullData() {
    return this.#fullData;
  }

}
