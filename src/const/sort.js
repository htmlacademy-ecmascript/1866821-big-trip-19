export const Sort = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

export const SortDefaultOrder = [
  Sort.DAY,
  Sort.EVENT,
  Sort.TIME,
  Sort.PRICE,
  Sort.OFFERS
];

export const SortDefaultValues = {
  [Sort.DAY]: {
    checked: true,
    disabled: false
  },
  [Sort.EVENT]: {
    checked: false,
    disabled: true
  },
  [Sort.TIME]: {
    checked: false,
    disabled: false
  },
  [Sort.PRICE]: {
    checked: false,
    disabled: false
  },
  [Sort.OFFERS]: {
    checked: false,
    disabled: true
  }
};
