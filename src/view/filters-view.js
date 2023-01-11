import AbstractView from '../framework/view/abstract-view';
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


export default class FiltersView extends AbstractView {
  #data = null;

  constructor({list, checked}) {
    super();

    this.#data = {list, checked};
  }

  get template() {
    return createFormTemplate(this.#data);
  }
}
