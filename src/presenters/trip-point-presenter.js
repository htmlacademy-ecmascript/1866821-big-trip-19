import { render, replace, remove} from '../framework/render.js';
import { PointModel } from '../model/point-model.js';
import PointView from '../view/points/point-view.js';
import PointEditView from '../view/points/point-edit-view.js';
import { UserAction, UpdateType } from '../const/common.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class TripPointPresenter {
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #pointComponent = null;
  #pointEditComponent = null;


  #mode = Mode.DEFAULT;
  #point = null;

  constructor({
    offersModel,
    destinationsModel,
    pointsListContainer,
    dataChange,
    modeChange
  }) {
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = dataChange;
    this.#handleModeChange = modeChange;
  }


  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointModel = new PointModel(this.#point, this.#offersModel.elements, this.#destinationsModel.elements);
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
        editClick: this.#handleCloseEditClick,
        deleteClick: this.#handleDeleteClick
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

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToEvent();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#pointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
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


  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#pointModel.fullData);
      this.#replaceFormToEvent();
    }
  };

  #handleOpenEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleCloseEditClick = () => {
    this.#pointEditComponent.reset(this.#pointModel.fullData);
    this.#replaceFormToEvent();
  };


  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleFormSubmit = (update) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      update,
    );
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
