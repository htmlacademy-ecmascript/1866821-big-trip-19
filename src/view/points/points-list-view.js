import AbstractView from '../../framework/view/abstract-view';

const createTemplate = () =>
  (
    `<ul class="trip-events__list">
    </ul>`
  );


export default class PointsListView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return createTemplate();
  }
}
