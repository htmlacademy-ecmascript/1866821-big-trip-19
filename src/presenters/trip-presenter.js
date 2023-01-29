import TripPointsListPresenter from './trip-points-list-presenter.js';
import TripFiltersPresenter from '../presenters/trip-filters-presenter.js';
import PointsListModel from '../model/points-list-model.js';
import TripInfoPresenter from '../presenters/trip-info-presenter.js';
import { mockDestinations } from '../mock/destination.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import { EVENT_BUTTON_DEFAULT_MESSAGE } from '../const/buttons';
import { render } from '../framework/render.js';
import { FiltersModel } from '../model/filters-model.js';
import { DestinationsModel } from '../model/destinations-model.js';
import EmptyPointsListPresenter from './empty-points-list-presenter.js';


export default class TripPresenter {
  #headerElement = null;
  #filtersWrapElement = null;
  #newEventButtonWrapElement = null;
  #eventsElement = null;
  #newEventButtonComponent = null;

  #filtersModel = null;
  #pointsModel = null;
  #destinationsModel = null;

  #tripInfoPresenter = null;
  #tripFiltersPresenter = null;
  #tripPointsPresenter = null;
  #emptyPointsPresenter = null;

  constructor() {
    this.#headerElement = document.querySelector('.trip-main');
    this.#filtersWrapElement = this.#headerElement.querySelector('.trip-controls__filters');
    this.#eventsElement = document.querySelector('.trip-events');
  }

  init() {
    this.#pointsModel = new PointsListModel();
    this.#destinationsModel = new DestinationsModel({destinations: [...mockDestinations]});
    this.#filtersModel = new FiltersModel();

    this.#initPresenters();

    this.#renderNewEventButton();

    if (this.#pointsModel.points.length !== 0) {
      this.#tripInfoPresenter.init();
    }
    this.#tripFiltersPresenter.init();
    this.#tripPointsPresenter.init();
  }

  #initPresenters() {
    this.#tripFiltersPresenter = new TripFiltersPresenter({
      filtersParentContainer: this.#filtersWrapElement,
      newEventButtonParentContainer: this.#newEventButtonWrapElement,
      pointsModel: this.#pointsModel,
      filtersModel: this.#filtersModel
    });

    this.#tripInfoPresenter = new TripInfoPresenter({
      parentContainer: this.#headerElement,
      pointsModel: this.#pointsModel,
      destinations: this.#destinationsModel.data
    });

    this.#tripPointsPresenter = new TripPointsListPresenter({
      tripContainer: this.#eventsElement,
      pointsModel: this.#pointsModel,
      filtersModel: this.#filtersModel,
      newPointDestroy: this.#handleNewTaskFormClose
    });

    this.#emptyPointsPresenter = new EmptyPointsListPresenter({
      parentContainer: this.#eventsElement,
      pointsModel: this.#pointsModel,
      filtersModel: this.#filtersModel
    });
  }

  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewEventButtonView({
      message: EVENT_BUTTON_DEFAULT_MESSAGE,
      addClick: this.#handleNewPoint
    });
    render(this.#newEventButtonComponent, this.#headerElement);
  }

  #handleNewPoint = () => {
    this.#tripPointsPresenter.createPoint();
    this.#newEventButtonComponent.element.disabled = true;
  };

  #handleNewTaskFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
    this.#emptyPointsPresenter.init();
  };

  get points() {
    return this.#pointsModel.points;
  }
}
