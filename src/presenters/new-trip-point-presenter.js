import { render, remove, RenderPosition} from '../framework/render.js';
import PointEditView from '../view/points/point-edit-view.js';
import { UserAction, UpdateType } from '../const/common.js';
import { PointModel } from '../model/point-model.js';
import { BLANK_POINT } from '../const/point.js';


export default class NewTripPointPresenter {
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointModel = null;
  #offersModel = null;
  #destinationsModel = null;

  #pointEditComponent = null;

  constructor({
    offersModel,
    destinationsModel,
    pointsListContainer,
    dataChange,
    destroy
  }) {
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = dataChange;
    this.#handleDestroy = destroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointModel = new PointModel(BLANK_POINT, this.#offersModel.data, this.#destinationsModel.elements);
    this.#pointEditComponent = new PointEditView(
      this.#pointModel.fullData,
      {
        formSubmit: this.#handleFormSubmit,
        editClick: this.#handleDeleteClick,
        deleteClick: this.#handleDeleteClick
      });

    render(this.#pointEditComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    const clonePoint = {...point};
    delete clonePoint.id;
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      clonePoint,
    );
  };

  #handleDeleteClick = () => {
    this.#handleDataChange(
      UserAction.CANCEL_POINT_EDIT,
      UpdateType.CLEAR,
      {...BLANK_POINT},
    );
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#handleDataChange(
        UserAction.CANCEL_POINT_EDIT,
        UpdateType.CLEAR,
        {...BLANK_POINT},
      );
      this.destroy();
    }
  };
}
