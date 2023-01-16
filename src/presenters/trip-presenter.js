import TripPointsListPresenter from './trip-points-list-presenter.js';
import TripFiltersPresenter from '../presenters/trip-filters-presenter.js';
import PointsListModel from '../model/points-list-model.js';
import TripInfoPresenter from '../presenters/trip-info-presenter.js';
import EmptyPointsListPresenter from './empty-points-list-presenter.js';
import { mockDestinations } from '../mock/destination.js';
import { mockPoints } from '../mock/point.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import { EVENT_BUTTON_DEFAULT_MESSAGE } from '../const/buttons';
import { render } from '../framework/render.js';


export default class TripPresenter {
  #headerElement = null;
  #filtersWrapElement = null;
  #newEventButtonWrapElement = null;
  #eventsElement = null;
  #newEventButtonComponent = null;

  #pointsModel = null;
  #destinations = null;

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
    this.#pointsModel = new PointsListModel({points: mockPoints.slice()});
    this.#destinations = [...mockDestinations];

    this.#initPresenters();

    this.#renderNewEventButton();

    if (this.#pointsModel.isEmpty()) {
      this.#initEmptyTrip();
      return;
    }
    this.#initSimpleTrip();
  }

  #initPresenters() {

    this.#tripFiltersPresenter = new TripFiltersPresenter({
      filtersParentContainer: this.#filtersWrapElement,
      newEventButtonParentContainer: this.#newEventButtonWrapElement,
      pointsModel: this.#pointsModel,
      onFilterPoints: this.#handlePointsChange
    });

    this.#emptyPointsPresenter = new EmptyPointsListPresenter({parentContainer: this.#eventsElement});

    if (this.#pointsModel.isEmpty()) {
      return;
    }

    this.#tripInfoPresenter = new TripInfoPresenter({
      parentContainer: this.#headerElement,
      pointsModel: this.#pointsModel,
      destinations: this.#destinations
    });

    this.#tripPointsPresenter = new TripPointsListPresenter({
      tripContainer: this.#eventsElement,
      pointsModel: this.#pointsModel
    });
  }

  #handlePointsChange = (points) => {
    if (!this.#pointsModel.isEmpty()) {
      this.#pointsModel.points = [...points];
      this.#tripPointsPresenter.clear();
      this.#tripPointsPresenter.init();
    }
  };


  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewEventButtonView({
      message: EVENT_BUTTON_DEFAULT_MESSAGE,
      onAddClick: this.#handleNewPoint
    });
    render(this.#newEventButtonComponent, this.#headerElement);
  }

  #handleNewPoint = () => { };

  #initEmptyTrip() {
    this.#tripFiltersPresenter.init();
    this.#emptyPointsPresenter.init();
  }

  #initSimpleTrip() {
    this.#tripInfoPresenter.init();
    this.#tripFiltersPresenter.init();
    this.#tripPointsPresenter.init();
  }
}
