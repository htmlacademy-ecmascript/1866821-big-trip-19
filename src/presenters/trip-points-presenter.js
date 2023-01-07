import SortView from '../view/sort-view.js';
import PointsListView from '../view/points/points-list-view.js';
import PointView from '../view/points/point-view.js';
import { PointModel } from '../model/point-model.js';
import PointChangeView from '../view/points/point-change-view.js';
import { PointModelType } from '../const/point.js';
import {render} from '../render';
import { SortModel } from '../model/sort-model.js';
import {mockPoints} from '../mock/point.js';


export default class TripPointsPresenter {
  sortModel = new SortModel();
  sortComponent = new SortView(this.sortModel.getData());

  pointsListComponent = new PointsListView();
  pointsListElement = this.pointsListComponent.getElement();

  pointModel = new PointModel(Object.assign({}, mockPoints[1]));
  pointChangeView = new PointChangeView(this.pointModel.getData(PointModelType.ADD));

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.sortComponent, this.tripContainer);
    render(this.pointChangeView, this.tripContainer);
    render(this.pointsListComponent, this.tripContainer);
    mockPoints.forEach((point) => {
      const pointModel = new PointModel(point);
      const pointComponent = new PointView(pointModel.getData(PointModelType.PREVIEW));
      render(pointComponent, this.pointsListElement);
    });
  }
}
