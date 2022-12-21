import TripInfoView from '../view/trip-info-view.js';
import FiltersFormView from '../view/filters/filters-form-view.js';
import FilterItem from '../view/filters/filter-item-view.js';
import { render } from '../render.js';
import { RenderPosition } from '../const/view.js';
import { TripInfoModel } from '../model/trip-info-model.js';
import { mockPoints } from '../mock/point.js';
import { mockDestinations } from '../mock/destination.js';
import { FiltersModel } from '../model/filters-model.js';

export default class TripControlsPresenter {

  tripInfoModel = new TripInfoModel({points: mockPoints, destinations: mockDestinations});
  tripInfoData = {
    startDate: this.tripInfoModel.getStartDate(),
    endDate: this.tripInfoModel.getEndDate(),
    cost: this.tripInfoModel.getCost(),
    destinations: this.tripInfoModel.getDestinations()
  };

  tripInfoComponent = new TripInfoView(this.tripInfoData);


  filtersModel = new FiltersModel();
  filtersData = this.filtersModel.getData();
  filtersFormComponent = new FiltersFormView();
  filtersFormElement = this.filtersFormComponent.getElement();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.tripInfoComponent, this.tripContainer, RenderPosition.AFTERBEGIN);

    this.filtersData.order.forEach( (filterName) => {
      render(new FilterItem({
        name: filterName,
        checked: this.filtersData.values[filterName].checked
      }),
      this.filtersFormElement);
    });

    render(this.filtersFormComponent, this.tripContainer);
  }
}
