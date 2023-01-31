import {getRandomArrayElement} from '../utils/common.js';
import {getRandomDestination} from './destination.js';
import {getOfferByIndex} from './offer.js';
import {PointTypes} from '../const/point.js';
import {nanoid} from 'nanoid';

const mockPoints = [
  {
    basePrice: '2200',
    dateFrom: new Date(Date.parse('2023-02-11T12:22:56.845Z')),
    dateTo: new Date(Date.parse('2023-03-11T13:45:13.375Z')),
    destination: getRandomDestination().id,
    id: `${nanoid()}`,
    isFavorite: true,
    offers: [getOfferByIndex(2).id, getOfferByIndex(6).id],
    type: PointTypes.FLIGHT
  },
  {
    basePrice: '1100',
    dateFrom: new Date(Date.parse('2023-03-10T05:00:00.845Z')),
    dateTo: new Date(Date.parse('2023-03-10T05:12:13.375Z')),
    destination: getRandomDestination().id,
    id: `${nanoid()}`,
    isFavorite: false,
    offers: [getOfferByIndex(3).id],
    type: PointTypes.BUS
  },
  {
    basePrice: '800',
    dateFrom: new Date(Date.parse('2023-02-01T10:55:56.845Z')),
    dateTo: new Date(Date.parse('2023-02-01T11:25:13.375Z')),
    destination: getRandomDestination().id,
    id: `${nanoid()}`,
    isFavorite: false,
    offers: [getOfferByIndex(3).id, getOfferByIndex(1).id],
    type: PointTypes.DRIVE
  },
  {
    basePrice: '300',
    dateFrom: new Date(Date.parse('2023-01-10T21:11:10.845Z')),
    dateTo: new Date(Date.parse('2023-01-10T23:11:13.375Z')),
    destination: getRandomDestination().id,
    id: `${nanoid()}`,
    isFavorite: false,
    offers: [getOfferByIndex(0).id, getOfferByIndex(5).id],
    type: PointTypes.SIGHTSEEING
  },
  {
    basePrice: '3400',
    dateFrom: new Date(Date.parse('2023-01-10T21:11:10.845Z')),
    dateTo: new Date(Date.parse('2023-03-10T23:11:13.375Z')),
    destination: getRandomDestination().id,
    id: `${nanoid()}`,
    isFavorite: false,
    offers: [getOfferByIndex(0).id],
    type: PointTypes.TAXI
  }
];


const getRandomPoint = () => getRandomArrayElement(mockPoints);

export { getRandomPoint, mockPoints };
