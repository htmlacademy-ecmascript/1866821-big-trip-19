import SortView from '../view/sort-view.js';
import PointsListView from '../view/points/points-list-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { SortModel } from '../model/sort-model.js';
import TripPointPresenter from './trip-point-presenter.js';
import { sortPointsDayDown, sortPointsPriceDown, sortPointsDurationDown } from '../utils/point.js';
import {SORT_DEFAULT_ORDER_VALUES, Sort} from '../const/sort.js';
import { updateItem } from '../utils/common.js';

export default class TripPointsListPresenter {
  #sortModel = null;
  #sortComponent = null;
  #pointsModel = null;
  #tripContainer = null;

  #points = [];
  #sourcedPoints = [];
  #pointsListComponent = new PointsListView();

  #pointsPresenters = new Map();

  constructor({
    tripContainer,
    pointsModel
  }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#sortModel = new SortModel({
      list: SORT_DEFAULT_ORDER_VALUES.slice(),
      checked: Sort.DAY,
      disabled: [Sort.EVENT, Sort.OFFERS]
    });

    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];

    this.#renderSort();
    this.#sortPoints(this.#sortModel.data.checked);
    this.#renderPointsList();
  }

  clear() {
    this.#clearPointsList();
    this.#clearSort();
  }

  #sortPoints(sortType) {
    switch (sortType) {
      case Sort.DAY:
        this.#points.sort(sortPointsDayDown);
        break;
      case Sort.PRICE:
        this.#points.sort(sortPointsPriceDown);
        break;
      case Sort.TIME:
        this.#points.sort(sortPointsDurationDown);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }
  }

  #handlePointDataChange = ({updatedPoint, resort = false}) => {
    this.#points = updateItem(this.#pointsModel.points, updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint);
    this.#handleSortTypeChange(this.#sortModel.data.checked, resort);
  };

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType, resort = false) => {
    if (this.#sortModel.data.checked === sortType && !resort) {
      return;
    }

    this.#sortPoints(sortType);
    this.clear();
    this.#renderPointsList();
    this.#sortModel.setCheckedType({checkedType: sortType});
    this.#renderSort();
  };

  #clearPointsList() {
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
  }

  #clearSort() {
    remove(this.#sortComponent);
  }

  #renderSort() {
    this.#sortComponent = new SortView(
      this.#sortModel.data,
      {sortTypeChange: this.#handleSortTypeChange}
    );
    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new TripPointPresenter({
      pointsListContainer: this.#pointsListComponent.element,
      dataChange: this.#handlePointDataChange,
      modeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#tripContainer);
    this.#points
      .slice()
      .forEach((point) => this.#renderPoint(point));
  }

}
