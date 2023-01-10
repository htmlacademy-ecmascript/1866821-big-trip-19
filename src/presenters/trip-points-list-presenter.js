import SortView from '../view/sort-view.js';
import PointsListView from '../view/points/points-list-view.js';
import EmptyPointsListView from '../view/points/empty-points-list-view.js';
import { render } from '../framework/render.js';
import { SortModel } from '../model/sort-model.js';
import { mockPoints } from '../mock/point.js';
import { NO_POINTS_MESSAGE } from '../const/point.js';
import TripPointPresenter from './trip-point-presenter.js';


export default class TripPointsListPresenter {
  #sortModel = new SortModel();
  #sortComponent = new SortView(this.#sortModel.data);

  #pointsListComponent = new PointsListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  #renderPointsList() {
    render(this.#sortComponent, this.tripContainer);
    render(this.#pointsListComponent, this.tripContainer);
    mockPoints.forEach((point) => {
      const pointPresenter = new TripPointPresenter({ pointsListComponent: this.#pointsListComponent});
      pointPresenter.init(point);
    });
  }

  #renderEmptyPointsList() {
    const emptyPointsListComponent = new EmptyPointsListView({message: NO_POINTS_MESSAGE});
    render(emptyPointsListComponent, this.tripContainer);
  }

  init() {
    if (mockPoints.length !== 0 ) {
      this.#renderPointsList();
      return;
    }
    this.#renderEmptyPointsList();
  }
}
