import {getRandomArrayElement} from '../utils.js';
import {getRandomDestination} from './destination.js';
import {getRandomOffer} from './offer.js';
import {EventType} from '../const/structure.js';

const mockPoints = [
  {
    basePrice: '2200',
    dateFrom: new Date(Date.parse('2019-07-11T22:55:56.845Z')),
    dateTo: new Date(Date.parse('2019-07-12T11:22:13.375Z')),
    destination: getRandomDestination().id,
    id: '2',
    isFavorite: false,
    offers: [getRandomOffer().id, getRandomOffer().id, getRandomOffer().id,],
    type: EventType.TAXI
  },
  {
    basePrice: '1100',
    dateFrom: new Date(Date.parse('2019-07-10T22:55:56.845Z')),
    dateTo: new Date(Date.parse('2019-07-11T11:22:13.375Z')),
    destination: getRandomDestination().id,
    id: '1',
    isFavorite: false,
    offers: [getRandomOffer().id, getRandomOffer().id, getRandomOffer().id,],
    type: EventType.BUS
  },
  {
    basePrice: '4300',
    dateFrom: new Date(Date.parse('2020-07-13T22:55:56.845Z')),
    dateTo: new Date(Date.parse('2021-07-14T11:22:13.375Z')),
    destination: getRandomDestination().id,
    id: '4',
    isFavorite: false,
    offers: [getRandomOffer().id, getRandomOffer().id, getRandomOffer().id,],
    type: EventType.DRIVE
  },
  {
    basePrice: '3300',
    dateFrom: new Date(Date.parse('2021-07-12T22:55:56.845Z')),
    dateTo: new Date(Date.parse('2022-09-13T11:22:13.375Z')),
    destination: getRandomDestination().id,
    id: '3',
    isFavorite: false,
    offers: [getRandomOffer().id, getRandomOffer().id, getRandomOffer().id,],
    type: EventType.FLIGHT
  }
];


const getRandomPoint = () => getRandomArrayElement(mockPoints);

export { getRandomPoint, mockPoints };
