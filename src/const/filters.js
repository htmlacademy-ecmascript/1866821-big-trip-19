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

export const FiltersDefaultValues = {
  [Filters.EVERYTHING]: {
    checked: true
  },
  [Filters.FUTURE]: {
    checked: false
  },
  [Filters.PRESENT]: {
    checked: false
  },
  [Filters.PAST]: {
    checked: false
  },
};
