import {Filters} from '../const/filters.js';
import FiltersView from '../view/filters-view.js';
import { render, remove, replace } from '../framework/render.js';

import { filter } from '../utils/filters.js';
import { UpdateType } from '../const/common.js';

export default class TripFiltersPresenter {
  #pointsModel = null;

  #filtersParentContainer = null;

  #filtersModel = null;
  #filtersComponent = null;

  constructor({
    filtersParentContainer,
    pointsModel,
    filtersModel
  }) {
    this.#filtersParentContainer = filtersParentContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }


  get filters() {
    const points = this.#pointsModel.elements;

    return [
      {
        type: Filters.EVERYTHING,
        count: filter[Filters.EVERYTHING](points).length,
      },
      {
        type: Filters.FUTURE,
        count: filter[Filters.FUTURE](points).length,
      },
      {
        type: Filters.PAST,
        count: filter[Filters.PAST](points).length,
      },
      {
        type: Filters.PRESENT,
        count: filter[Filters.PRESENT](points).length,
      }
    ];
  }


  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView({
      filters,
      currentFilterType: this.#filtersModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });


    if (prevFilterComponent === null) {
      render(this.#filtersComponent, this.#filtersParentContainer);
      return;
    }

    replace(this.#filtersComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }

    this.#filtersModel.setCheckedType(UpdateType.MAJOR, filterType);
  };
}
