import SortView from '../view/sort-view.js';
import PointsListView from '../view/points/points-list-view.js';
import { render, remove, RenderPosition } from '../framework/render.js';
import { SortModel } from '../model/sort-model.js';
import TripPointPresenter from './trip-point-presenter.js';
import { sortPointsDayDown, sortPointsPriceDown, sortPointsDurationDown } from '../utils/point.js';
import { SORT_DEFAULT_ORDER_VALUES, Sort } from '../const/sort.js';
import { UserAction, UpdateType } from '../const/common.js';
import { Filters } from '../const/filters.js';
import { filter } from '../utils/filters.js';

export default class TripPointsListPresenter {
  #sortModel = null;
  #sortComponent = null;
  #pointsModel = null;
  #tripContainer = null;
  #filtersModel = null;
  #filterType = Filters.EVERYTHING;

  #pointsListComponent = new PointsListView();

  #pointsPresenters = new Map();

  constructor({
    tripContainer,
    pointsModel,
    filtersModel
  }) {
    this.#tripContainer = tripContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#sortModel = new SortModel({
      list: SORT_DEFAULT_ORDER_VALUES.slice(),
      checked: Sort.DAY,
      disabled: [Sort.EVENT, Sort.OFFERS]
    });

    this.#renderSort();
    this.#renderPointsList();
  }

  clear() {
    this.#clearPointsList();
    this.#clearSort();
  }


  #handlePointDataChange = (updatedPoint) => {
    this.#pointsPresenters.get(updatedPoint.id).init(updatedPoint);
    this.#handleSortTypeChange(this.#sortModel.data.checked);
  };

  #handleModeChange = () => {
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoints(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoints(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoints(updateType, update);
        break;
    }
  };


  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderPointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList({resetRenderedPointCount: true, resetSortType: true});
        this.#renderPointsList();
        break;
    }
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#sortModel.data.checked === sortType) {
      return;
    }

    this.clear();
    this.#sortModel.setCheckedType({checkedType: sortType});
    this.#renderPointsList();
    this.#renderSort();
  };

  #clearPointsList({resetRenderedPointCount = false, resetSortType = false} = {}) {
    const pointsCount = this.points.length;

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
      dataChange: this.#handleViewAction,
      modeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  }

  #renderPointsList() {
    render(this.#pointsListComponent, this.#tripContainer);
    this.points
      .slice()
      .forEach((point) => this.#renderPoint(point));
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#sortModel.data.checked) {
      case Sort.DAY:
        return filteredPoints.sort(sortPointsDayDown);
      case Sort.PRICE:
        return filteredPoints.sort(sortPointsPriceDown);
      case Sort.TIME:
        return filteredPoints.sort(sortPointsDurationDown);
    }

    return filteredPoints;
  }
}
