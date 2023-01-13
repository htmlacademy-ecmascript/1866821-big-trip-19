import TripInfoView from '../view/trip-info-view.js';
import { render } from '../framework/render.js';
import { RenderPosition } from '../const/view.js';
import { TripInfoModel } from '../model/trip-info-model.js';
import { mockPoints } from '../mock/point.js';

export default class TripInfoPresenter {
  #model = null;
  #component = null;
  #parentContainer = null;
  #destinations = null;

  constructor({parentContainer, pointsModel, destinations}) {
    this.#parentContainer = parentContainer;
    if (mockPoints.length !== 0) {
      this.#model = new TripInfoModel({pointsModel, destinations});
    }
  }

  init() {
    this.#render();
  }

  #render() {
    this.#component = new TripInfoView(this.#model.data);
    render(this.#component, this.#parentContainer, RenderPosition.AFTERBEGIN);
  }
}
