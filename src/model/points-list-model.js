export default class PointsListModel {
  #points = [];

  constructor({points}) {
    this.points = points;
  }

  isEmpty() {
    return this.#points.length === 0;
  }

  set points(points) {
    this.#points = points;
  }

  get points() {
    return this.#points;
  }
}
