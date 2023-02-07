import AbstractView from '../../framework/view/abstract-view';
import { EmptyPointsListType } from '../../const/filters';

const createTemplate = (checkedType) => {

  const message = EmptyPointsListType[checkedType];

  return (
    `<p class='trip-events__msg'>${message}</p>`
  );
};

export default class EmptyPointsListView extends AbstractView {
  #checkedType = null;

  constructor({checkedType}) {
    super();
    this.#checkedType = checkedType;
  }

  get template() {
    return createTemplate(this.#checkedType);
  }
}
