export class DestinationsModel {
  #data = null;

  constructor({ destinations }) {
    this.#data = destinations;
  }

  get data() {
    return this.#data;
  }
}
