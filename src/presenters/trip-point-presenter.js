import { render, replace, remove} from '../framework/render.js';
import { PointModel } from '../model/point-model.js';
import PointView from '../view/points/point-view.js';
import PointEditView from '../view/points/point-edit-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPointPresenter {
  #pointModel = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #pointsListContainer = null;

  #mode = Mode.DEFAULT;
  #point = null;

  constructor({pointsListContainer}) {
    this.#pointsListContainer = pointsListContainer;
  }

  #replaceEventToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToEvent = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleOpenEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleCloseEditClick = () => {
    this.#replaceFormToEvent();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  init(point) {
    this.#point = point;
    this.#pointModel = new PointModel(this.#point);
    this.#pointComponent = new PointView(
      this.#pointModel.previewData,
      {
        onEditClick: this.#handleOpenEditClick,
        onFavoriteClick: () => {}
      });
    this.#pointEditComponent = new PointEditView(
      this.#pointModel.fullData,
      {
        onFormSubmit: () => {},
        onEditClick: this.#handleCloseEditClick
      });
    render(this.#pointComponent, this.#pointsListContainer.element);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }
}
