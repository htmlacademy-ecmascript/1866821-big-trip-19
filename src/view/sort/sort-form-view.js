import { createElement } from '../../render.js';

const createTemplate = () =>
  (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    </form>`
  );


export default class SortFormView {
  getTemplate() {
    return createTemplate();
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
