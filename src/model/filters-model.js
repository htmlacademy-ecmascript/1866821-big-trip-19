import {FiltersDefaultOrder, Filters} from '../const/filters.js';

export class FiltersModel {
  setCheckedType({checkedType}) {
    this.data.checked = checkedType;
  }

  getData() {
    return {
      list: FiltersDefaultOrder.slice(0),
      checked: Filters.EVERYTHING
    };
  }
}
