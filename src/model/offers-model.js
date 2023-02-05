export class OffersModel {
  #apiService = null;
  #elemets = null;

  constructor({ apiService }) {
    this.#apiService = apiService;
  }

  get elements() {
    return this.#elemets;
  }

  async init() {
    try {
      this.#elemets = await this.#apiService.elements;
    } catch(err) {
      this.#elemets = [];
    }
  }
}
