export class SortModel {
  #data = null;

  constructor({
    types,
    checkedType,
    disabledTypes
  }) {
    this.#data = {
      types,
      checkedType,
      disabledTypes
    };
  }

  get data() {
    return this.#data;
  }

  setCheckedType({checkedType}) {
    this.#data.checkedType = checkedType;
  }
}
