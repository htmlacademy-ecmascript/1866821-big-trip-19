import FilterView from '../view/filter-view.js';
import TripInfoView from '../view/trip-info-view.js';
import {render} from '../render.js';
import {RenderPosition} from '../const/view.js';

export default class TripControlsPresenter {

  filterComponent = new FilterView();
  tripInfoComponent = new TripInfoView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.filterComponent, this.tripContainer, RenderPosition.BEFOREEND);
  }
}
