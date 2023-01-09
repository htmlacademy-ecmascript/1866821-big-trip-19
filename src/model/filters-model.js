import {FILTERS_DEFAULT_ORDER_VALUES, Filters} from '../const/filters.js';

export class FiltersModel {
  #data = {
    list: FILTERS_DEFAULT_ORDER_VALUES.slice(),
    checked: Filters.EVERYTHING
  };

  set data({list = FILTERS_DEFAULT_ORDER_VALUES.slice(), checked}) {
    this.#data = {
      list,
      checked
    };
  }

  get data() {
    return this.#data;
  }
}
