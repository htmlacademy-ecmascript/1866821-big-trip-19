import { createElement } from '../render.js';
import {bringFirstCharToUpperCase} from '../utils.js';

const getCheckedAttribute = ({sortName, checked}) => (sortName === checked) ? 'checked' : '';
const getDisabledAttribute = ({sortName, disabled}) => (disabled.includes(sortName)) ? 'disabled' : '';

const createItemRepeatingTemplate = ({list, checked, disabled}) =>
  list.map((sortName) => (
    `<div class="trip-sort__item  trip-sort__item--${sortName}">
      <input id="sort-${sortName}" 
        class="trip-sort__input  
        visually-hidden" type="radio" 
        name="trip-sort" 
        value="sort-${sortName}" 
        ${getCheckedAttribute({sortName, checked})}
        ${getDisabledAttribute({sortName, disabled})}
      >
      <label class="trip-sort__btn" for="sort-${sortName}">
        ${bringFirstCharToUpperCase(sortName)}
      </label>
    </div>`)
  ).join('');

const createFormTemplate = ({list, checked, disabled}) =>
  (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createItemRepeatingTemplate({list, checked, disabled})}
    </form>`
  );


export default class SortView {
  #data = null;
  #element = null;

  constructor({list, checked, disabled}) {
    this.#data = {list, checked, disabled};
  }

  get template() {
    return createFormTemplate(this.#data);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
