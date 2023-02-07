import { sortPointsDayUp } from '../utils/point.js';

export class TripInfoModel {
  #points = null;
  #destinations = null;
  #offersByType = null;
  #data = null;

  constructor({pointsModel, destinations, offers}) {
    this.#points = [...pointsModel.elements].sort(sortPointsDayUp);
    this.#destinations = [...destinations];
    this.#offersByType = [...offers];

    this.#data = {
      startDate: this.#getStartDate(),
      endDate: this.#getEndDate(),
      cost: this.#getCost(),
      destinationsTitles: this.#getDestinationsTitles()
    };
  }

  get data() {
    return this.#data;
  }

  #getStartDate = () => {
    let startDate = this.#points[0].dateFrom;

    this.#points.forEach((point) => {
      if (point.dateFrom < startDate) {
        startDate = point.dateFrom;
      }
    });

    return startDate;
  };

  #getEndDate = () => {
    let endDate = this.#points[0].dateFrom;
    this.#points.forEach((point) => {
      if (point.dateTo > endDate) {
        endDate = point.dateTo;
      }
    });

    return endDate;
  };

  #getCost = () => {
    let cost = 0;
    this.#points.forEach((point) => {
      cost += Number(point.basePrice);
    });
    cost += this.#getOffersSumm();
    return cost;
  };


  #getOffersSumm = () => {
    let offersSumm = 0;
    let checkedOffersList = [];

    this.#points.forEach((point) => {

      const offersOfPointType = this.#offersByType.find((offerByType) => offerByType.type === point.type).offers;

      const filteredOffers = offersOfPointType.filter((offer) => point.offers.includes(offer.id));

      checkedOffersList = [...checkedOffersList, ...filteredOffers];

    });

    checkedOffersList.forEach((offer) => {
      offersSumm += Number(offer.price);
    });

    return offersSumm;
  };

  #getDestinationsTitles = () => {
    let previosId = -1;
    const destinationsIdsNoRepeat = [];

    this.#points.forEach((point) => {
      if (previosId !== point.destination) {
        destinationsIdsNoRepeat.push(point.destination);
      }
      previosId = point.destination;
    });

    const destinationsNames = [];

    destinationsIdsNoRepeat.forEach((id) => {
      this.#destinations.forEach((destination) => {
        if (destination.id === id) {
          destinationsNames.push(destination.name);
        }
      });
    });

    return destinationsNames;
  };
}
