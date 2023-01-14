import AbstractView from '../framework/view/abstract-view';
import {bringFirstCharToUpperCase} from '../utils/common.js';

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
        data-filter-type="${filterName}"
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
  #handleFilterTypeChange = null;

  constructor({list, checked, filterChange}) {
    super();

    this.#data = {list, checked};
    this.#handleFilterTypeChange = filterChange;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFormTemplate(this.#data);
  }

  #filterTypeChangeHandler = (evt) => {
    const inputNode = evt.target.parentNode.querySelector('input');
    evt.preventDefault();
    this.#handleFilterTypeChange(inputNode.dataset.filterType);
  };
}
