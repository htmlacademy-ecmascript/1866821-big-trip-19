import { render, remove, RenderPosition} from '../framework/render.js';
import PointEditView from '../view/points/point-edit-view.js';
import {nanoid} from 'nanoid';
import { UserAction, UpdateType } from '../const/common.js';
import { PointModel } from '../model/point-model.js';
import { OffersModel } from '../model/offers-model.js';
import { DestinationsModel } from '../model/destinations-model.js';
import { mockOffersByType } from '../mock/offersByType.js';
import { mockDestinations } from '../mock/destination.js';
import { mockOffers } from '../mock/offer.js';
import { BLANK_POINT } from '../const/point.js';


export default class NewTripPointPresenter {
  #pointsListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #pointModel = null;

  #pointEditComponent = null;

  constructor({
    pointsListContainer,
    dataChange,
    destroy
  }) {
    this.#pointsListContainer = pointsListContainer;
    this.#handleDataChange = dataChange;
    this.#handleDestroy = destroy;
  }

  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    const offersModel = new OffersModel({offersByType: [...mockOffersByType], offers: [...mockOffers]});
    const destinationsModel = new DestinationsModel({destinations: [...mockDestinations]});
    this.#pointModel = new PointModel(BLANK_POINT, offersModel.data, destinationsModel.data);
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

  #handleFormSubmit = (task) => {
    const cloneTask = {...task};
    cloneTask.id = nanoid();
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      cloneTask,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
