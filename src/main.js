import TripEventsPresenter from './presenters/trip-events-presenter.js';
import TripControlsPresenter from './presenters/trip-controls-presenter.js';
import TripInfoView from './view/trip-info-view.js';
import {render} from './render.js';
import { RenderPosition } from './const/view.js';

const tripControlsElement = document.querySelector('.trip-main');
const tripControlsFilterElement = tripControlsElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

render(new TripInfoView(), tripControlsElement, RenderPosition.AFTERBEGIN);
const tripControlsPrenter = new TripControlsPresenter({tripContainer: tripControlsFilterElement});
const tripEventsPresenter = new TripEventsPresenter({tripContainer: tripEventsElement});

tripControlsPrenter.init();
tripEventsPresenter.init();
