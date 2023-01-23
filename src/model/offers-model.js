export class OffersModel {
  #data = null;

  constructor({ offersByType, offers }) {
    this.#data = { offersByType, offers };
  }

  get data() {
    return this.#data;
  }
}
