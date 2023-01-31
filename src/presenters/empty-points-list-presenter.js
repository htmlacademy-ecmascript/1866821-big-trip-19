import EmptyPointsListView from '../view/points/empty-points-list-view.js';
import { render, remove} from '../framework/render.js';
import { filter } from '../utils/filters.js';

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

    this.#handleModelEvent();
  }

  init() {
    this.#emptyPointsListComponent = new EmptyPointsListView({checkedType: this.#filtersModel.filter});
    this.#renderEmptyPointsList();
  }


  #handleModelEvent = () => {

    const filteredPoints = filter[this.#filtersModel.filter](this.#pointsModel.points);

    if (this.#pointsModel.points.length === 0) {
      if (this.#emptyPointsListComponent) {
        this.clear();
      } else {
        this.init();
      }
      return;
    }

    if (filteredPoints.length === 0) {

      this.clear();
      this.init();

    } else if (this.#emptyPointsListComponent) {
      this.clear();
    }
  };

  clear() {
    remove(this.#emptyPointsListComponent);
  }

  #renderEmptyPointsList() {
    render(this.#emptyPointsListComponent, this.#container);
  }

}
