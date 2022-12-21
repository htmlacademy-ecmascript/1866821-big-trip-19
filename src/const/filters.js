export const Filters = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const FiltersDefaultOrder = [
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
