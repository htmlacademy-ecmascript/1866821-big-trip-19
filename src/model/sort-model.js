import {SortDefaultValues, SortDefaultOrder} from '../const/sort.js';

export class SortModel {

  data = {
    order: SortDefaultOrder.slice(0),
    values: Object.assign({}, SortDefaultValues),
  };

  setCheckedType({checkedType}) {
    this.data.values[checkedType].checked = true;
  }

  setDisabledTypes({disabledTypes}) {
    disabledTypes.forEach( (disabledType) => {
      this.data.values[disabledType].disabled = true;
    });
  }

  getData() {
    return this.data;
  }
}
