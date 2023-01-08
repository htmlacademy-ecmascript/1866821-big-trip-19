import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import { render } from '../render.js';
import { RenderPosition } from '../const/view.js';
import { TripInfoModel } from '../model/trip-info-model.js';
import { FiltersModel } from '../model/filters-model.js';
import { mockPoints } from '../mock/point.js';

export default class TripControlsPresenter {

  #tripInfoModel = null;
  #tripInfoComponent = null;
  #tripFiltersContainer = null;

  #filtersModel = new FiltersModel();
  #filtersComponent = new FiltersView(this.#filtersModel.data);

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
    this.#tripFiltersContainer = this.tripContainer.querySelector('.trip-controls__filters');
    if (mockPoints.length !== 0) {
      this.#tripInfoModel = new TripInfoModel();
      this.#tripInfoComponent = new TripInfoView(this.#tripInfoModel.data);
    }
  }

  init() {
    if (this.#tripInfoComponent !== null) {
      render(this.#tripInfoComponent, this.tripContainer, RenderPosition.AFTERBEGIN);
    }
    render(this.#filtersComponent, this.#tripFiltersContainer);
  }
}
