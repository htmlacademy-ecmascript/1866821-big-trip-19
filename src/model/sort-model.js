export class SortModel {
  #data = null;

  constructor({
    list,
    checked,
    disabled
  }) {
    this.#data = {
      list,
      checked,
      disabled
    };
  }

  setCheckedType({checkedType}) {
    this.#data.checked = checkedType;
  }

  get data() {
    return this.#data;
  }
}
