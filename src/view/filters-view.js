import AbstractView from '../framework/view/abstract-view';
import {bringFirstCharToUpperCase} from '../utils/common.js';


const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, count} = filter;
  return(
    `<div class="trip-filters__filter">
      <input 
        id="filter-${type}" 
        class="trip-filters__filter-input  
        visually-hidden" 
        type="radio" 
        name="trip-filter" 
        value="${type}" 
        data-filter-type="${type}"
        ${type === currentFilterType ? 'checked' : ''}
        ${count === 0 ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${type}">
        ${bringFirstCharToUpperCase(type)}
      </label>
    </div>`
  );
};

const createFormTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};


export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();

    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFormTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    const inputNode = evt.target.parentNode.querySelector('input');
    evt.preventDefault();
    this.#handleFilterTypeChange(inputNode.dataset.filterType);
  };
}
