import Observable from '../framework/observable.js';
import { Filters } from '../const/filters.js';

export class FiltersModel extends Observable {
  #checkedType = Filters.EVERYTHING;

  setType(updateType, checkedType) {
    this.#checkedType = checkedType;
    this._notify(updateType, checkedType);
  }

  get filter() {
    return this.#checkedType;
  }
}
