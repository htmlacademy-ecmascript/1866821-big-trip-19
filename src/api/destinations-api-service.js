import ApiService from '../framework/api-service.js';
import { Url } from '../const/api.js';

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: Url.DESTINATIONS})
      .then(ApiService.parseResponse);
  }
}
