import {FILTERS_DEFAULT_ORDER_VALUES, Filters} from '../const/filters.js';
import FiltersView from '../view/filters-view.js';
import { render, remove } from '../framework/render.js';
import { FiltersModel } from '../model/filters-model.js';
import { filter } from '../utils/filters.js';


export default class TripFiltersPresenter {
  #points = [];
  #pointsModel = null;
  #filteredPoints = [];

  #filtersParentContainer = null;
  #handlePointsFilter = null;

  #filtersModel = null;
  #filtersComponent = null;

  constructor({
    filtersParentContainer,
    pointsModel,
    onFilterPoints,
  }) {
    this.#filtersParentContainer = filtersParentContainer;
    this.#pointsModel = pointsModel;
    this.#handlePointsFilter = onFilterPoints;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#filteredPoints = [...this.#pointsModel.points];

    this.#filtersModel = new FiltersModel({
      list: FILTERS_DEFAULT_ORDER_VALUES.slice(),
      checked: Filters.EVERYTHING
    });

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

  #renderFilters() {
    this.#filtersComponent = new FiltersView({
      list: this.#filtersModel.data.list,
      checked: this.#filtersModel.data.checked,
      onFilterChange: this.#handleFilterTypeChange
    });
    render(this.#filtersComponent, this.#filtersParentContainer);
  }

  #render() {
    this.#renderFilters();
  }

}
