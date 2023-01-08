import {SORT_DEFAULT_ORDER_VALUES, Sort} from '../const/sort.js';

export class SortModel {
  #data = {
    list: SORT_DEFAULT_ORDER_VALUES.slice(),
    checked: Sort.DAY,
    disabled: [Sort.EVENT, Sort.OFFERS]
  };

  get data() {
    return this.#data;
  }
}
