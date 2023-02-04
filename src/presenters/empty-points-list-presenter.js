import EmptyPointsListView from '../view/points/empty-points-list-view.js';
import { render, remove} from '../framework/render.js';
import { filter } from '../utils/filters.js';
import { UpdateType } from '../const/common.js';
import { FILTERS_DEFAULT_ORDER_VALUES } from '../const/filters.js';

export default class EmptyPointsListPresenter {
  #emptyPointsListComponent = null;
  #container = null;
  #pointsModel = null;
  #filtersModel = null;

  constructor({parentContainer, pointsModel, filtersModel}) {
    this.#container = parentContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);

    if (this.#pointsModel.elements.length === 0 && !this.#emptyPointsListComponent) {
      this.init();
    }
  }

  init() {
    this.#emptyPointsListComponent = new EmptyPointsListView({checkedType: this.#filtersModel.filter});
    this.#renderEmptyPointsList();
  }


  #handleModelEvent = (updateType, data) => {
    const filteredPoints = filter[this.#filtersModel.filter](this.#pointsModel.elements);

    const pointsClear = (this.#pointsModel.elements.length === 0 || filteredPoints.length === 0);

    const typesForInit = (updateType === UpdateType.CLEAR || updateType === UpdateType.MINOR);

    if (this.#emptyPointsListComponent) {
      this.clear();
    }

    if (pointsClear && (typesForInit || FILTERS_DEFAULT_ORDER_VALUES.includes(data))) {
      this.init();
    }

  };

  clear() {
    remove(this.#emptyPointsListComponent);
  }

  #renderEmptyPointsList() {
    render(this.#emptyPointsListComponent, this.#container);
  }

}
