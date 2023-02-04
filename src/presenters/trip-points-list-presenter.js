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
import NewTripPointPresenter from './new-trip-point-presenter.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import { BlockerTimeLimit } from '../const/common.js';


export default class TripPointsListPresenter {
  #sortModel = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #sortComponent = null;
  #tripContainer = null;
  #filtersModel = null;
  #filterType = Filters.EVERYTHING;
  #handleNewPointDestroy = null;

  #pointsListComponent = new PointsListView();

  #pointsPresenters = new Map();
  #newPointPresenter = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: BlockerTimeLimit.LOWER_LIMIT,
    upperLimit: BlockerTimeLimit.UPPER_LIMIT
  });

  constructor({
    pointsModel,
    filtersModel,
    offersModel,
    destinationsModel,
    tripContainer,
    newPointDestroy
  }) {
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#tripContainer = tripContainer;
    this.#handleNewPointDestroy = newPointDestroy;

    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#pointsModel.addObserver(this.#handleModelEvent);

    this.#sortModel = new SortModel({
      list: SORT_DEFAULT_ORDER_VALUES.slice(),
      checked: Sort.DAY,
      disabled: [Sort.EVENT, Sort.OFFERS]
    });

    this.#newPointPresenter = new NewTripPointPresenter({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      pointsListContainer: this.#pointsListComponent.element,
      dataChange: this.#handleViewAction,
      destroy: this.#handleNewPointDestroy
    });
  }

  get points() {
    this.#filterType = this.#filtersModel.filter;
    const points = this.#pointsModel.elements;
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

  init() {
    if (this.#pointsModel.elements.length !== 0) {
      this.#renderSort();
    }
    this.#renderPointsList();
  }

  clear() {
    this.#clearPointsList();
    this.#clearSort();
  }

  createPoint = () => {
    this.#sortModel.checkedType = Sort.DAY;
    this.#filtersModel.setType(UpdateType.MAJOR, Filters.EVERYTHING);
    this.#newPointPresenter.init();
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.resetView());
  };


  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updateElements(updateType, update);
        } catch(err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addElement(updateType, update);
        } catch(err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointsPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deleteElement(updateType, update);
        } catch(err) {
          this.#pointsPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.CANCEL_POINT_EDIT:
        this.#pointsModel.keepPoints(updateType, update);
        break;
    }

    this.#uiBlocker.unblock();
  };


  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointsPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        if (this.#pointsModel.elements.length === 0) {
          this.#clearSort();
        }
        this.#renderPointsList();
        break;
      case UpdateType.MAJOR:
        this.#clearSort();
        this.#clearPointsList({resetSortType: true});
        this.#renderSort();
        this.#renderPointsList();
        break;
      case UpdateType.INIT:
        this.#renderSort();
        this.#renderPointsList();
        break;
    }
  };


  #handleSortTypeChange = (sortType) => {
    if (this.#sortModel.data.checked === sortType) {
      return;
    }

    this.#sortModel.setCheckedType({checkedType: sortType});
    this.#clearPointsList();
    this.#clearSort();
    this.#renderSort();
    this.#renderPointsList();
  };


  #clearPointsList({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointsPresenters.forEach((presenter) => presenter.destroy());
    this.#pointsPresenters.clear();
    if (resetSortType) {
      this.#sortModel.setCheckedType({checkedType: Sort.DAY });
    }
  }

  #clearSort = () => remove(this.#sortComponent);

  #renderSort = () => {
    this.#sortComponent = new SortView(
      this.#sortModel.data,
      {sortTypeChange: this.#handleSortTypeChange}
    );

    render(this.#sortComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoint = (point) => {
    const pointPresenter = new TripPointPresenter({
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      pointsListContainer: this.#pointsListComponent.element,
      dataChange: this.#handleViewAction,
      modeChange: this.#handleModeChange
    });
    pointPresenter.init(point);
    this.#pointsPresenters.set(point.id, pointPresenter);
  };


  #renderPointsList = () => {
    render(this.#pointsListComponent, this.#tripContainer);

    this.points
      .slice()
      .forEach((point) => this.#renderPoint(point));
  };

}
