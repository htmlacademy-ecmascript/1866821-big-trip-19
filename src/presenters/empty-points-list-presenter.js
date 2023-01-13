import EmptyPointsListView from '../view/points/empty-points-list-view.js';
import { render, remove} from '../framework/render.js';
import { NO_POINTS_MESSAGE } from '../const/point.js';


export default class EmptyPointsListPresenter {
  #emptyPointsListComponent = new EmptyPointsListView({message: NO_POINTS_MESSAGE});
  #container = null;

  constructor({parentContainer}) {
    this.#container = parentContainer;
  }

  init() {
    this.#renderEmptyPointsList();
  }

  clear() {
    remove(this.#emptyPointsListComponent);
  }

  #renderEmptyPointsList() {
    render(this.#emptyPointsListComponent, this.#container);
  }

}
