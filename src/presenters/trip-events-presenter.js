import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import EventsListView from '../view/events-list-view.js';
import {render} from '../render';
import {RenderPosition} from '../const/view.js'
import {PointTemplateType, EventsListTemplateType} from '../const/view.js' 

export default class TripEventsPresenter {

  eventsListEmptyComponent = new EventsListView(EventsListTemplateType.EMPTY);
  eventsListLoadingComponent = new EventsListView(EventsListTemplateType.LOADING);
  eventsListComponent = new EventsListView(EventsListTemplateType.FILL);
  sortComponent = new SortView();
  pointEditComponent = new PointView();
  pointAddSimpleComponent = new PointView(PointTemplateType.ADD_SIMPLE);
  pointAddWithoutDestinationComponent = new PointView(PointTemplateType.ADD_WITHOUT_DESTINATION);
  pointAddWithoutOffersComponent = new PointView(PointTemplateType.ADD_WITHOUT_OFFERS);

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(this.sortComponent, this.tripContainer);
    render(this.eventsListComponent, this.tripContainer);
    
    render(this.pointAddSimpleComponent, this.eventsListComponent.getElement(), RenderPosition.AFTERBEGIN)
    render(this.pointAddWithoutDestinationComponent, this.eventsListComponent.getElement(), RenderPosition.AFTERBEGIN)
    render(this.pointAddWithoutOffersComponent, this.eventsListComponent.getElement(), RenderPosition.AFTERBEGIN)
    render(this.pointEditComponent, this.eventsListComponent.getElement(), RenderPosition.AFTERBEGIN)  

    render(this.eventsListEmptyComponent, this.tripContainer);
    render(this.eventsListLoadingComponent, this.tripContainer);
    
  }
}
