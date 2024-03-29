import ApiService from '../framework/api-service.js';
import { Url } from '../const/api.js';

export default class OffersApiService extends ApiService {
  get elements() {
    return this._load({url: Url.OFFERS})
      .then(ApiService.parseResponse);
  }
}
