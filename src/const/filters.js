const Filters = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const FILTERS_DEFAULT_ORDER_VALUES = [
  Filters.EVERYTHING,
  Filters.FUTURE,
  Filters.PAST,
  Filters.PRESENT,
];

const FILTERS_DEFAULT_TYPES_WITH_COUNT = [
  {'type': Filters.EVERYTHING, 'count': 0},
  {'type': Filters.FUTURE, 'count': 0},
  {'type': Filters.PAST, 'count': 0},
  {'type': Filters.PRESENT, 'count': 0},
];

const NO_POINTS_MESSAGE = 'Click New Event to create your first point';

const EmptyPointsListType = {
  [Filters.EVERYTHING]: 'Click New Event to create your first point',
  [Filters.FUTURE]: 'There are no events in future',
  [Filters.PAST]: 'There are no events in past',
  [Filters.PRESENT]: 'There are no events in present'
};

export {
  Filters,
  FILTERS_DEFAULT_ORDER_VALUES,
  FILTERS_DEFAULT_TYPES_WITH_COUNT,
  NO_POINTS_MESSAGE,
  EmptyPointsListType
};
