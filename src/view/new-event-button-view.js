import AbstractView from '../framework/view/abstract-view';

const createTemplate = (message) =>
  (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">${message}</button>`
  );

export default class NewEventButtonView extends AbstractView {
  #message = null;
  #handleAddClick = null;

  constructor({
    message,
    addClick
  }) {
    super();

    this.#message = message;
    this.#handleAddClick = addClick;

    this.element.addEventListener('click', this.#addClickHandler );
  }

  get template() {
    return createTemplate(this.#message);
  }

  #addClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleAddClick();
  };
}
