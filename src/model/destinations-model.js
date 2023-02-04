export class DestinationsModel {
  #apiService = null;

  #data = null;

  constructor({ apiService }) {
    this.#apiService = apiService;
  }

  get data() {
    return this.#data;
  }

  async init() {
    try {
      this.#data = await this.#apiService.data;
    } catch(err) {
      this.#data = [];
    }
  }
}
