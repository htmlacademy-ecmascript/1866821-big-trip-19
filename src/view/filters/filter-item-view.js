import {createElement} from '../../render.js';
import {bringFirstCharToUpperCase} from '../../utils.js';

const getCheckedAttribute = (checked) => checked ? 'checked' : '';


const createTemplate = ({name, checked}) =>
  (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" 
        class="trip-filters__filter-input  
        visually-hidden" 
        type="radio" 
        name="trip-filter" 
        value="${name}" 
        ${getCheckedAttribute(checked)}
      >
      <label class="trip-filters__filter-label" for="filter-${name}">
        ${bringFirstCharToUpperCase(name)}
      </label>
    </div>
    `
  );


export default class FilterItem {

  constructor({name, checked}) {
    this.data = {
      name,
      checked
    };
  }

  getTemplate() {
    return createTemplate(this.data);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
