import AbstractView from '../../framework/view/abstract-view';

const createEmptyPointsTemplate = (message) =>
  (
    `<p class='trip-events__msg'>${message}</p>`
  );


export default class EmptyPointsListView extends AbstractView {
  #message = '';

  constructor({message}) {
    super();

    this.#message = message;
  }

  get template() {
    return createEmptyPointsTemplate(this.#message);
  }
}
