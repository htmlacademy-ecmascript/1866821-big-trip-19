import {getRandomArrayElement} from '../utils.js';

const mockOffers = [
  {
    'id': 111,
    'title': 'Upgrade to a business class',
    'price': 1120
  },
  {
    'id': 222,
    'title': 'Upgrade to a econom class',
    'price': 1720
  },
  {
    'id': 333,
    'title': 'Upgrade to a super class',
    'price': 1420
  },
  {
    'id': 444,
    'title': 'Seat place',
    'price': 6120
  },
  {
    'id': 555,
    'title': 'Upgrade to a tree class',
    'price': 'lay place'
  }
];

const getRandomOffer = () => getRandomArrayElement(mockOffers);

export { getRandomOffer };
