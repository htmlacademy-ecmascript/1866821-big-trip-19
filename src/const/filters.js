export const Filters = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const FILTERS_DEFAULT_ORDER_VALUES = [
  Filters.EVERYTHING,
  Filters.FUTURE,
  Filters.PRESENT,
  Filters.PAST
];

export const NO_POINTS_MESSAGE = 'Click New Event to create your first point';

export const EmptyPointsListType = {
  [Filters.EVERYTHING]: 'Click New Event to create your first point',
  [Filters.FUTURE]: 'There are no events in future',
  [Filters.PAST]: 'There are no events in past',
  [Filters.PRESENT]: 'There are no events in present'
};
