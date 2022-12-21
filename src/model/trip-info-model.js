export class TripInfoModel {
  constructor({points, destinations}) {
    this.points = points;
    this.destinations = destinations;
  }

  getStartDate() {
    let startDate = this.points[0].dateFrom;

    this.points.forEach((point) => {
      if (point.dateFrom < startDate) {
        startDate = point.dateFrom;
      }
    });

    return startDate;
  }

  getEndDate() {
    let endDate = this.points[0].dateFrom;
    this.points.forEach((point) => {
      if (point.dateTo > endDate) {
        endDate = point.dateTo;
      }
    });

    return endDate;
  }

  getCost() {
    let cost = 0;
    this.points.forEach((point) => {
      cost += Number(point.basePrice);
    });
    return cost;
  }

  getDestinations() {
    let prevId = '-1';
    const destinationsIdsNoRepeat = [];

    this.points.forEach((point) => {
      if (prevId !== point.destination) {
        destinationsIdsNoRepeat.push(point.destination);
      }
      prevId = point.destination;
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
}
