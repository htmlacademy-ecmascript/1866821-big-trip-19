import {FILTERS_DEFAULT_ORDER_VALUES, Filters} from '../const/filters.js';
import FiltersView from '../view/filters-view.js';
import NewEventButtonView from '../view/new-event-button-view.js';
import { render, remove } from '../framework/render.js';
import { FiltersModel } from '../model/filters-model.js';
import { filter } from '../utils/filters.js';
import { EVENT_BUTTON_DEFAULT_MESSAGE } from '../const/buttons';

export default class TripControlsPresenter {
  #points = [];
  #pointsModel = null;
  #filteredPoints = [];

  #filtersParentContainer = null;
  #handlePointsFilter = null;

  #newEventButtonParentContainer = null;
  #handleAddPoint = null;

  #filtersModel = null;
  #filtersComponent = null;

  #newEventButtonComponent = null;

  constructor({
    filtersParentContainer,
    newEventButtonParentContainer,
    pointsModel,
    onFilterPoints,
    onAddButtonClick
  }) {
    this.#filtersParentContainer = filtersParentContainer;
    this.#newEventButtonParentContainer = newEventButtonParentContainer;
    this.#pointsModel = pointsModel;

    this.#filtersModel = new FiltersModel({
      list: FILTERS_DEFAULT_ORDER_VALUES.slice(),
      checked: Filters.EVERYTHING
    });

    this.#handlePointsFilter = onFilterPoints;
    this.#handleAddPoint = onAddButtonClick;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#filteredPoints = [...this.#pointsModel.points];
    this.#render();
  }

  #filterPoints(filterType) {
    this.#filteredPoints = filter[filterType](this.#points);
  }

  #handleFilterTypeChange = (filterType) => {
    if (filterType === this.#filtersModel.data.checked) {
      return;
    }

    this.#filterPoints(filterType);
    this.#handlePointsFilter(this.#filteredPoints);
    this.#filtersModel.setCheckedType({checkedType: filterType});
    this.#clearFilters();
    this.#renderFilters();
  };

  #clearFilters() {
    remove(this.#filtersComponent);
  }

  #renderNewEventButton() {
    this.#newEventButtonComponent = new NewEventButtonView({
      message: EVENT_BUTTON_DEFAULT_MESSAGE,
      onAddClick: this.#handleAddPoint
    });
    render(this.#newEventButtonComponent, this.#newEventButtonParentContainer);
  }

  #renderFilters() {
    this.#filtersComponent = new FiltersView({
      list: this.#filtersModel.data.list,
      checked: this.#filtersModel.data.checked,
      onFilterChange: this.#handleFilterTypeChange
    });
    render(this.#filtersComponent, this.#filtersParentContainer);
  }

  #render() {
    this.#renderNewEventButton();
    this.#renderFilters();
  }

}
