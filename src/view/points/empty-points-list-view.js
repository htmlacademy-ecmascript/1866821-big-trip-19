import { createElement } from '../../render.js';

const createEmptyPointsTemplate = (message) =>
  (
    `<p class='trip-events__msg'>${message}</p>`
  );


export default class EmptyPointsListView {
  #element = null;
  #message = '';

  constructor({message}) {
    this.#message = message;
  }

  get template() {
    return createEmptyPointsTemplate(this.#message);
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
