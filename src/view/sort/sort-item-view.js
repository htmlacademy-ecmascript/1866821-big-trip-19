import {createElement} from '../../render.js';
import {bringFirstCharToUpperCase} from '../../utils.js';

const getCheckedAttribute = (checked) => checked ? 'checked' : '';
const getDisabledAttribute = (disabled) => disabled ? 'disabled' : '';


const createTemplate = ({name, checked, disabled}) =>
  (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" 
        class="trip-sort__input  
        visually-hidden" type="radio" 
        name="trip-sort" 
        value="sort-${name}" 
        ${getCheckedAttribute(checked)}
        ${getDisabledAttribute(disabled)}
      >
      <label class="trip-sort__btn" for="sort-${name}">
        ${bringFirstCharToUpperCase(name)}
      </label>
    </div>`
  );


export default class SortItemView {

  constructor({name, checked, disabled}) {
    this.data = {
      name,
      checked,
      disabled
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
