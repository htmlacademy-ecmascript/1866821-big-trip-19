import SortView from '../view/sort-view.js';
import PointsListView from '../view/points/points-list-view.js';
import EmptyPointsListView from '../view/points/empty-points-list-view.js';
import PointView from '../view/points/point-view.js';
import { PointModel } from '../model/point-model.js';
import PointEditView from '../view/points/point-edit-view.js';
import { render } from '../render';
import { SortModel } from '../model/sort-model.js';
import { mockPoints } from '../mock/point.js';
import { NO_POINTS_MESSAGE } from '../const/point.js';


export default class TripPointsPresenter {
  #sortModel = new SortModel();
  #sortComponent = new SortView(this.#sortModel.data);

  #pointsListComponent = new PointsListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  #renderPoint(point) {
    const pointModel = new PointModel(point);
    const pointComponent = new PointView(pointModel.previewData);
    const pointEditComponent = new PointEditView(pointModel.fullData);

    const replaceEventToForm = () => {
      this.#pointsListComponent.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToEvent = () => {
      this.#pointsListComponent.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const closeRollupHandler = (evt) => {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('click', closeRollupHandler);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replaceEventToForm();
      document.addEventListener('keydown', escKeyDownHandler);
      pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', closeRollupHandler);
    });

    pointEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    });

    render(pointComponent, this.#pointsListComponent.element);
  }

  #renderPointsList() {
    render(this.#sortComponent, this.tripContainer);
    render(this.#pointsListComponent, this.tripContainer);
    mockPoints.forEach((point) => {
      this.#renderPoint(point);
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
