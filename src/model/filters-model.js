import {FILTERS_DEFAULT_ORDER_VALUES, Filters} from '../const/filters.js';

export class FiltersModel {
  setCheckedType({checkedType}) {
    this.data.checked = checkedType;
  }

  getData() {
    return {
      list: FILTERS_DEFAULT_ORDER_VALUES.slice(),
      checked: Filters.EVERYTHING
    };
  }
}
