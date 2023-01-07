import {SORT_DEFAULT_ORDER_VALUES, Sort} from '../const/sort.js';

export class SortModel {
  data = {
    list: SORT_DEFAULT_ORDER_VALUES.slice(),
    checked: Sort.DAY,
    disabled: [Sort.EVENT, Sort.OFFERS]
  };

  setCheckedType({checkedType}) {
    this.data.checked = checkedType;
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
