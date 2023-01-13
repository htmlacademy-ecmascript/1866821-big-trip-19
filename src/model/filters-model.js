export class FiltersModel {
  #data = null;

  constructor({list, checked}) {
    this.#data = {
      list,
      checked
    };
  }

  setCheckedType({checkedType}) {
    this.#data.checked = checkedType;
  }

  get data() {
    return this.#data;
  }
}
