export class OffersModel {
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
      this.#data = await this.#apiService.elements;
    } catch(err) {
      this.#data = [];
    }
  }
}
