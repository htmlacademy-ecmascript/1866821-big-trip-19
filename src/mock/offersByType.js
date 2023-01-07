import { PointTypes } from '../const/point.js';
import { getOfferByIndex } from './offer.js';

const mockOffersByType = [
  {
    'type': PointTypes.BUS,
    'offers': [getOfferByIndex(3), getOfferByIndex(1), getOfferByIndex(5)]
  },
  {
    'type': PointTypes.CHECK_IN,
    'offers': [getOfferByIndex(6), getOfferByIndex(0), getOfferByIndex(2), getOfferByIndex(3)]
  },
  {
    'type': PointTypes.DRIVE,
    'offers': [getOfferByIndex(3), getOfferByIndex(1)]
  },
  {
    'type': PointTypes.FLIGHT,
    'offers': [getOfferByIndex(2), getOfferByIndex(1), getOfferByIndex(3), getOfferByIndex(6)]
  },
  {
    'type': PointTypes.RESTAURANT,
    'offers': [getOfferByIndex(4), getOfferByIndex(1), getOfferByIndex(5)]
  },
  {
    'type': PointTypes.SHIP,
    'offers': [getOfferByIndex(0), getOfferByIndex(4), getOfferByIndex(7)]
  },
  {
    'type': PointTypes.SIGHTSEEING,
    'offers': [getOfferByIndex(2), getOfferByIndex(5), getOfferByIndex(3), getOfferByIndex(0)]
  },
  {
    'type': PointTypes.TAXI,
    'offers': [getOfferByIndex(0)]
  },
  {
    'type': PointTypes.TRAIN,
    'offers': [getOfferByIndex(1), getOfferByIndex(2), getOfferByIndex(7)]
  }
];

export { mockOffersByType };
