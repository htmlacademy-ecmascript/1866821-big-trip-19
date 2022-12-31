import TripInfoView from '../view/trip-info-view.js';
import FiltersView from '../view/filters-view.js';
import { render } from '../render.js';
import { RenderPosition } from '../const/view.js';
import { TripInfoModel } from '../model/trip-info-model.js';
import { FiltersModel } from '../model/filters-model.js';

export default class TripControlsPresenter {

  tripInfoModel = new TripInfoModel();
  tripInfoComponent = new TripInfoView(this.tripInfoModel.getData());


  filtersModel = new FiltersModel();
  filtersComponent = new FiltersView(this.filtersModel.getData());


  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.tripInfoComponent, this.tripContainer, RenderPosition.AFTERBEGIN);
    render(this.filtersComponent, this.tripContainer);
  }
}
