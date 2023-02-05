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

  setCheckedType({checkedType}) {
    this.#data.checkedType = checkedType;
  }

  get data() {
    return this.#data;
  }
}
