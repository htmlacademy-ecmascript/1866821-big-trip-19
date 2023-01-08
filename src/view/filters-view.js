import { createElement } from '../render.js';
import {bringFirstCharToUpperCase} from '../utils.js';

const getCheckedAttribute = ({filterName, checked}) => (filterName === checked) ? 'checked' : '';

const createItemRepeatingTemplate = ({list, checked}) =>
  list.map((filterName) => (
    `<div class="trip-filters__filter">
      <input id="filter-${filterName}" 
        class="trip-filters__filter-input  
        visually-hidden" 
        type="radio" 
        name="trip-filter" 
        value="${filterName}" 
        ${getCheckedAttribute({filterName, checked})}
      >
      <label class="trip-filters__filter-label" for="filter-${filterName}">
        ${bringFirstCharToUpperCase(filterName)}
      </label>
    </div>`)
  ).join('');


const createFormTemplate = ({list, checked}) =>
  (
    `<form class="trip-filters" action="#" method="get">
      ${createItemRepeatingTemplate({list, checked})}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );


export default class FiltersView {
  #data = null;
  #element = null;

  constructor({list, checked}) {
    this.#data = {list, checked};
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
