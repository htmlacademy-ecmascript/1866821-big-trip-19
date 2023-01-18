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
  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;
  #point = null;

  constructor({
    pointsListContainer,
    dataChange,
    modeChange
  }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = dataChange;
    this.#handleModeChange = modeChange;
  }


  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointModel = new PointModel(this.#point);
    this.#pointComponent = new PointView(
      this.#pointModel.previewData,
      {
        editClick: this.#handleOpenEditClick,
        favoriteClick: this.#handleFavoriteClick
      });
    this.#pointEditComponent = new PointEditView(
      this.#pointModel.fullData,
      {
        formSubmit: this.#handleFormSubmit,
        editClick: this.#handleCloseEditClick
      });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointsListContainer);
      return;
    }

    switch (this.#mode) {
      case Mode.DEFAULT:
        replace(this.#pointComponent, prevPointComponent);
        break;
      case Mode.EDITING:
        replace(this.#pointEditComponent, prevPointEditComponent);
        break;
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);

  }

  #replaceEventToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToEvent = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #handleOpenEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleCloseEditClick = () => {
    this.#replaceFormToEvent();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #handleFormSubmit = () => {
    this.#handleDataChange({...this.#point});
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }
}
