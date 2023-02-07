import TripPointsListPresenter from './trip-points-list-presenter.js';
import TripFiltersPresenter from '../presenters/trip-filters-presenter.js';
import PointsListModel from '../model/points-list-model.js';
import TripInfoPresenter from '../presenters/trip-info-presenter.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import { EVENT_BUTTON_DEFAULT_MESSAGE } from '../const/buttons';
import { remove, render } from '../framework/render.js';
import { FiltersModel } from '../model/filters-model.js';
import { DestinationsModel } from '../model/destinations-model.js';
import EmptyPointsListPresenter from './empty-points-list-presenter.js';
import PointsApiService from '../api/points-api-service.js';
import { END_POINT, AUTHORIZATION } from '../const/api.js';
import DestinationsApiService from '../api/destinations-api-service.js';
import { OffersModel } from '../model/offers-model.js';
import OffersApiService from '../api/offers-api-service.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import LoadingView from '../view/loading-view.js';
import { BlockerMessage, BlockerTimeLimit } from '../const/common.js';
import FiltersView from '../view/filters-view.js';


export default class TripPresenter {
  #headerElement = null;
  #filtersWrapElement = null;
  #newEventButtonWrapElement = null;
  #eventsElement = null;
  #newEventButtonComponent = null;
  #loadingComponent = new LoadingView();
  #filtersStartComponent = new FiltersView();

  #filtersModel = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  #tripInfoPresenter = null;
  #tripFiltersPresenter = null;
  #tripPointsPresenter = null;
  #emptyPointsPresenter = null;

  #uiBlocker = new UiBlocker({
    lowerLimit: BlockerTimeLimit.LOWER_LIMIT,
    upperLimit: BlockerTimeLimit.UPPER_LIMIT
  });

  constructor() {
    this.#headerElement = document.querySelector('.trip-main');
    this.#filtersWrapElement = this.#headerElement.querySelector('.trip-controls__filters');
    this.#eventsElement = document.querySelector('.trip-events');
  }

  get points() {
    return this.#pointsModel.elements;
  }

  init() {
    this.#renderLoading();
    this.#uiBlocker.block();

    this.#renderNewEventButton();
    this.#renderStartFilters();

    this.#initModels()
      .then(() => {
        remove(this.#loadingComponent);
        remove(this.#filtersStartComponent);

        this.#initPresenters();
        this.#uiBlocker.unblock();
      })
      .catch( () => {
        remove(this.#loadingComponent);
        this.#loadingComponent = new LoadingView({message: BlockerMessage.NO_DATA});
        this.#renderLoading();
      }
      );
  }

  async #initModels() {
    const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);
    const destinationsApiService = new DestinationsApiService(END_POINT, AUTHORIZATION);
    const offersApiService = new OffersApiService(END_POINT, AUTHORIZATION);

    this.#pointsModel = new PointsListModel({apiService: pointsApiService});
    this.#destinationsModel = new DestinationsModel({apiService: destinationsApiService});
    this.#offersModel = new OffersModel({apiService: offersApiService});
    this.#filtersModel = new FiltersModel();

    await this.#pointsModel.init();
    await this.#destinationsModel.init();
    await this.#offersModel.init();

    if(this.#destinationsModel.elements.length === 0 || this.#offersModel.elements.length === 0){
      throw new Error('empty destinations or offers');
    }
  }

  #initPresenters = () => {
    this.#tripFiltersPresenter = new TripFiltersPresenter({
      filtersParentContainer: this.#filtersWrapElement,
      newEventButtonParentContainer: this.#newEventButtonWrapElement,
      pointsModel: this.#pointsModel,
      filtersModel: this.#filtersModel
    });
    this.#tripFiltersPresenter.init();

    this.#tripInfoPresenter = new TripInfoPresenter({
      parentContainer: this.#headerElement,
      pointsModel: this.#pointsModel,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel
    });
    this.#tripInfoPresenter.init();

    this.#tripPointsPresenter = new TripPointsListPresenter({
      pointsModel: this.#pointsModel,
      filtersModel: this.#filtersModel,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      tripContainer: this.#eventsElement,
      newPointDestroy: this.#handleNewPointFormClose
    });
    this.#tripPointsPresenter.init();

    this.#emptyPointsPresenter = new EmptyPointsListPresenter({
      parentContainer: this.#eventsElement,
      pointsModel: this.#pointsModel,
      filtersModel: this.#filtersModel
    });
  };

  #renderNewEventButton = () => {
    this.#newEventButtonComponent = new NewEventButtonView({
      message: EVENT_BUTTON_DEFAULT_MESSAGE,
      addClick: this.#handleNewPoint
    });
    render(this.#newEventButtonComponent, this.#headerElement);
  };

  #renderLoading() {
    render(this.#loadingComponent, this.#eventsElement);
  }

  #renderStartFilters() {
    render(this.#filtersStartComponent, this.#filtersWrapElement);
  }

  #handleNewPoint = () => {
    this.#tripPointsPresenter.createPoint();
    this.#newEventButtonComponent.element.disabled = true;
    this.#emptyPointsPresenter.clear();
  };

  #handleNewPointFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
  };
}
