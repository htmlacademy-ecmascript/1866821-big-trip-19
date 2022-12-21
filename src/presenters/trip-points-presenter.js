import SortFormView from '../view/sort/sort-form-view.js';
import SortItemView from '../view/sort/sort-item-view.js';
import PointsListView from '../view/points/points-list-view.js';

import {render} from '../render';

import { SortModel } from '../model/sort-model.js';

export default class TripPointsPresenter {
  sortModel = new SortModel();
  sortData = this.sortModel.getData();
  sortFormComponent = new SortFormView();
  sortFormElement = this.sortFormComponent.getElement();

  pointsListComponent = new PointsListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    this.sortData.order.forEach( (sortName) => {

      render(new SortItemView({
        name: sortName,
        checked: this.sortData.values[sortName].checked,
        disabled: this.sortData.values[sortName].disabled
      }), this.sortFormElement);
    });

    render(this.sortFormComponent, this.tripContainer);
    render(this.pointsListComponent, this.tripContainer);
  }
}
