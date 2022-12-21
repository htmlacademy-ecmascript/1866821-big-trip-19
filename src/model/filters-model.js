import {FiltersDefaultValues, FiltersDefaultOrder} from '../const/filters.js';

export class FiltersModel {

  data = {
    order: FiltersDefaultOrder.slice(0),
    values: Object.assign({}, FiltersDefaultValues)
  };

  setCheckedType({checkedType}) {
    this.data.values[checkedType].checked = true;
  }

  getData() {
    return this.data;
  }
}
