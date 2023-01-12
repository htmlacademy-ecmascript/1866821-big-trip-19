import TripPointsListPresenter from '../presenters/trip-points-list-presenter.js';
import TripControlsPresenter from '../presenters/trip-controls-presenter.js';
import PointsListModel from '../model/points-list-model.js';
import TripInfoPresenter from '../presenters/trip-info-presenter.js';
import EmptyPointsListPresenter from './empty-points-list-presenter.js';
import { mockDestinations } from '../mock/destination.js';
import { mockPoints } from '../mock/point.js';


export default class TripPresenter {
  #headerElement = null;
  #filtersWrapElement = null;
  #newEventButtonWrapElement = null;
  #eventsElement = null;

  #pointsModel = null;
  #destinations = null;

  #tripInfoPresenter = null;
  #tripControlsPresenter = null;
  #tripPointsPresenter = null;
  #emptyPointsPresenter = null;

  constructor() {
    this.#headerElement = document.querySelector('.trip-main');
    this.#filtersWrapElement = this.#headerElement.querySelector('.trip-controls__filters');
    this.#newEventButtonWrapElement = this.#headerElement;
    this.#eventsElement = document.querySelector('.trip-events');

    this.#pointsModel = new PointsListModel({points: mockPoints.slice()});
    this.#destinations = [...mockDestinations];

    this.#initPresenters();

  }

  #initPresenters() {

    this.#tripControlsPresenter = new TripControlsPresenter(
      {
        filtersParentContainer: this.#filtersWrapElement,
        newEventButtonParentContainer: this.#newEventButtonWrapElement,
        pointsModel: this.#pointsModel,
        onFilterPoints: this.#handlePointsChange,
        onAddButtonClick: this.#handleNewPoint
      }
    );

    this.#emptyPointsPresenter = new EmptyPointsListPresenter({parentContainer: this.#eventsElement});

    if (this.#pointsModel.isEmpty()) {
      return;
    }

    this.#tripInfoPresenter = new TripInfoPresenter(
      {
        parentContainer: this.#headerElement,
        pointsModel: this.#pointsModel,
        destinations: this.#destinations
      }
    );

    this.#tripPointsPresenter = new TripPointsListPresenter(
      {
        tripContainer: this.#eventsElement,
        pointsModel: this.#pointsModel
      }
    );
  }

  #handlePointsChange = (points) => {
    if (!this.#pointsModel.isEmpty()) {
      this.#pointsModel.points = points;
      this.#tripPointsPresenter.clear();
      this.#tripPointsPresenter.init();
    }
  };

  #handleNewPoint = () => { };

  #initEmptyTrip() {
    this.#tripControlsPresenter.init();
    this.#emptyPointsPresenter.init();
  }

  #initSimpleTrip() {
    this.#tripInfoPresenter.init();
    this.#tripControlsPresenter.init();
    this.#tripPointsPresenter.init();
  }

  init() {
    if (this.#pointsModel.isEmpty()) {
      this.#initEmptyTrip();
      return;
    }
    this.#initSimpleTrip();
  }
}
