import TripPointsPresenter from './presenters/trip-points-presenter.js';
import TripControlsPresenter from './presenters/trip-controls-presenter.js';

const tripControlsElement = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');

const tripControlsPresenter = new TripControlsPresenter({tripContainer: tripControlsElement});
const tripPointsPresenter = new TripPointsPresenter({tripContainer: tripEventsElement});

tripControlsPresenter.init();
tripPointsPresenter.init();
