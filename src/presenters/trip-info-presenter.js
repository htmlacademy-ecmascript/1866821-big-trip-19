import TripInfoView from '../view/trip-info-view.js';
import { render, remove} from '../framework/render.js';
import { RenderPosition } from '../const/view.js';
import { TripInfoModel } from '../model/trip-info-model.js';

export default class TripInfoPresenter {
  #model = null;
  #component = null;
  #parentContainer = null;
  #destinations = null;
  #pointsModel = null;

  constructor({parentContainer, pointsModel, destinations}) {
    this.#parentContainer = parentContainer;
    this.#pointsModel = pointsModel;
    this.#destinations = destinations;
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#model = new TripInfoModel({
      pointsModel: this.#pointsModel,
      destinations: this.#destinations
    });
    this.#render();
  }

  #render() {
    this.#component = new TripInfoView(this.#model.data);
    render(this.#component, this.#parentContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = () => {
    this.clear();
    if (this.#pointsModel.points.length !== 0) {
      this.init();
    }
  };

  clear() {
    remove(this.#component);
  }
}
