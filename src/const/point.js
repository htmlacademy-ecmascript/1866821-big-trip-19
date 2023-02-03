export const PointTypes = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

export const DEFAULT_POINT_ID = '-111';

export const BLANK_POINT = {
  basePrice: '1',
  dateFrom: new Date(Date.now()),
  dateTo: new Date(Date.now()),
  destination: '',
  isFavorite: false,
  offers: [],
  type: PointTypes.TAXI
};
