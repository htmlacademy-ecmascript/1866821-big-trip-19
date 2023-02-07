import AbstractView from '../framework/view/abstract-view.js';
import { BlockerMessage } from '../const/common.js';

const createTemplate = (message) => (
  `<p class='trip-events__msg'>${message}</p>`
);

export default class LoadingView extends AbstractView {
  #message = null;

  constructor({message = BlockerMessage.LOAD} = {}) {
    super();
    this.#message = message;
  }

  get template() {
    return createTemplate(this.#message);
  }
}
