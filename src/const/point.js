import {nanoid} from 'nanoid';

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

export const BLANK_POINT = {
  id: `${nanoid()}`,
  basePrice: '0',
  dateFrom: new Date(Date.now()),
  dateTo: new Date(Date.now()),
  destination: '',
  isFavorite: false,
  offers: [],
  type: PointTypes.CHECK_IN
};
