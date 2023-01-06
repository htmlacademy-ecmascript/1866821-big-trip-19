import { mockPoints } from '../mock/point.js';
import { mockDestinations } from '../mock/destination.js';

export class TripInfoModel {
  constructor() {
    this.points = mockPoints.slice();
    this.destinations = mockDestinations.slice();
  }

  #getStartDate() {
    let startDate = this.points[0].dateFrom;

    this.points.forEach((point) => {
      if (point.dateFrom < startDate) {
        startDate = point.dateFrom;
      }
    });

    return startDate;
  }

  #getEndDate() {
    let endDate = this.points[0].dateFrom;
    this.points.forEach((point) => {
      if (point.dateTo > endDate) {
        endDate = point.dateTo;
      }
    });

    return endDate;
  }

  #getCost() {
    let cost = 0;
    this.points.forEach((point) => {
      cost += Number(point.basePrice);
    });
    return cost;
  }

  #getDestinations() {
    let previosId = '-1';
    const destinationsIdsNoRepeat = [];

    this.points.forEach((point) => {
      if (previosId !== point.destination) {
        destinationsIdsNoRepeat.push(point.destination);
      }
      previosId = point.destination;
    });

    const destinationsNames = [];

    destinationsIdsNoRepeat.forEach((id) => {
      this.destinations.forEach((destination) => {
        if (destination.id === id) {
          destinationsNames.push(destination.name);
        }
      });
    });
    return destinationsNames;
  }

  getData() {
    return {
      startDate: this.#getStartDate(),
      endDate: this.#getEndDate(),
      cost: this.#getCost(),
      destinations: this.#getDestinations()
    };
  }
}
