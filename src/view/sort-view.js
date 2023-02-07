import AbstractView from '../framework/view/abstract-view';
import {bringFirstCharToUpperCase} from '../utils/common.js';

const getCheckedAttribute = ({sortName, checkedType}) => (sortName === checkedType) ? 'checked' : '';
const getDisabledAttribute = ({sortName, disabledTypes}) => (disabledTypes.includes(sortName)) ? 'disabled' : '';

const createItemRepeatingTemplate = ({types, checkedType, disabledTypes}) =>
  types.map((sortName) => (
    `<div class="trip-sort__item  trip-sort__item--${sortName}">
      <input id="sort-${sortName}" 
        class="trip-sort__input  
        visually-hidden" type="radio" 
        name="trip-sort" 
        value="sort-${sortName}"
        data-sort-type="${sortName}"
        ${getCheckedAttribute({sortName, checkedType})}
        ${getDisabledAttribute({sortName, disabledTypes})}
      >
      <label class="trip-sort__btn" 
        for="sort-${sortName}" 
      >
        ${bringFirstCharToUpperCase(sortName)}
      </label>
    </div>`)
  ).join('');

const createFormTemplate = ({types, checkedType, disabledTypes}) =>
  (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${createItemRepeatingTemplate({types, checkedType, disabledTypes})}
    </form>`
  );


export default class SortView extends AbstractView {
  #data = null;
  #handleSortTypeChange = null;

  constructor({types, checkedType, disabledTypes}, {sortTypeChange}) {
    super();

    this.#data = {types, checkedType, disabledTypes};
    this.#handleSortTypeChange = sortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createFormTemplate(this.#data);
  }

  #sortTypeChangeHandler = (evt) => {
    if (!evt.target.classList.contains('trip-sort__btn')) {
      return;
    }

    const inputNode = evt.target.parentNode.querySelector('input');
    if (inputNode.disabled) {
      return;
    }

    evt.preventDefault();
    this.#handleSortTypeChange(inputNode.dataset.sortType);
  };
}
