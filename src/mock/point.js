import {getRandomArrayElement} from '../utils.js';
import {getRandomDestination} from './destination.js';
import {getOfferByIndex} from './offer.js';
import {PointTypes} from '../const/point.js';

const mockPoints = [
  {
    basePrice: '2200',
    dateFrom: new Date(Date.parse('2019-07-11T12:22:56.845Z')),
    dateTo: new Date(Date.parse('2019-07-12T13:45:13.375Z')),
    destination: getRandomDestination().id,
    id: '2',
    isFavorite: true,
    offers: [getOfferByIndex(2).id, getOfferByIndex(6).id],
    type: PointTypes.FLIGHT
  },
  {
    basePrice: '1100',
    dateFrom: new Date(Date.parse('2019-07-10T02:40:00.845Z')),
    dateTo: new Date(Date.parse('2019-07-11T05:12:13.375Z')),
    destination: getRandomDestination().id,
    id: '1',
    isFavorite: false,
    offers: [getOfferByIndex(3).id],
    type: PointTypes.BUS
  },
  {
    basePrice: '4300',
    dateFrom: new Date(Date.parse('2020-07-13T10:55:56.845Z')),
    dateTo: new Date(Date.parse('2021-07-14T11:23:13.375Z')),
    destination: getRandomDestination().id,
    id: '4',
    isFavorite: false,
    offers: [getOfferByIndex(3).id, getOfferByIndex(1).id],
    type: PointTypes.DRIVE
  },
  {
    basePrice: '3300',
    dateFrom: new Date(Date.parse('2021-07-12T22:55:56.845Z')),
    dateTo: new Date(Date.parse('2022-09-13T23:23:13.375Z')),
    destination: getRandomDestination().id,
    id: '3',
    isFavorite: false,
    offers: [getOfferByIndex(0).id, getOfferByIndex(5).id],
    type: PointTypes.SIGHTSEEING
  }
];


const getRandomPoint = () => getRandomArrayElement(mockPoints);

export { getRandomPoint, mockPoints };
