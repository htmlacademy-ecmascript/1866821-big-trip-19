export class DestinationsModel {
  #apiService = null;

  #elements = null;

  constructor({ apiService }) {
    this.#apiService = apiService;
  }

  get elements() {
    return this.#elements;
  }

  async init() {
    try {
      this.#elements = await this.#apiService.elements;
    } catch(err) {
      this.#elements = [];
    }
  }
}
