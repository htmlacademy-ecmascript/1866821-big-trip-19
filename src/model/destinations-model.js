export class DestinationsModel {
  #destinationsApiService = null;

  #data = null;

  constructor({ destinationsApiService }) {
    this.#destinationsApiService = destinationsApiService;
  }

  get data() {
    return this.#data;
  }

  async init() {
    try {
      this.#data = await this.#destinationsApiService.destinations;
    } catch(err) {
      this.#data = [];
    }
  }
}
