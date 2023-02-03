export class OffersModel {
  #offersApiService = null;

  #data = null;

  constructor({ offersApiService }) {
    this.#offersApiService = offersApiService;
  }

  get data() {
    return this.#data;
  }

  async init() {
    try {
      this.#data = await this.#offersApiService.offers;
    } catch(err) {
      this.#data = [];
    }
  }

  #getAllItems = (objectsList) => {
    const res = objectsList.map( (item) => item.offers);
    const allOffers = [];
    res.forEach((element) => {
      allOffers.push(...element);
    });
    return allOffers;
  };
}
