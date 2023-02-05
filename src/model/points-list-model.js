import Observable from '../framework/observable.js';
import { UpdateType } from '../const/common.js';

export default class PointsListModel extends Observable {
  #apiService = null;

  #elements = null;

  constructor({apiService}) {
    super();

    this.#apiService = apiService;
  }

  get elements() {
    return this.#elements;
  }

  async init() {
    try {
      const points = await this.#apiService.elements;
      this.#elements = points.map(this.#adaptToClient);
      //this.#elementsCollection = [];
    } catch(err) {
      this.#elements = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updateElements(updateType, update) {
    const index = this.#elements.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }
    try {
      const response = await this.#apiService.updateElement(update);
      const updatedPoint = this.#adaptToClient(response);
      this.#elements = [
        ...this.#elements.slice(0, index),
        update,
        ...this.#elements.slice(index + 1),
      ];
      this._notify(updateType, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addElement(updateType, update) {
    try {
      const response = await this.#apiService.addElement(update);
      const newPoint = this.#adaptToClient(response);
      this.#elements = [newPoint, ...this.#elements];
      this._notify(updateType, newPoint);
    } catch(err) {
      throw new Error('Can\'t add task');
    }
  }

  async deleteElement(updateType, update) {
    const index = this.#elements.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#apiService.deleteElement(update);
      this.#elements = [
        ...this.#elements.slice(0, index),
        ...this.#elements.slice(index + 1),
      ];

      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t delete point');
    }
  }

  keepPoints(updateType, update) {
    this._notify(updateType, update);
  }

  #adaptToClient(point) {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
