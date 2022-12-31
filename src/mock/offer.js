import {getRandomArrayElement} from '../utils.js';

const mockOffers = [
  {
    'id': 111,
    'title': 'Upgrade to business',
    'price': 1120
  },
  {
    'id': 222,
    'title': 'Upgrade to econom',
    'price': 1720
  },
  {
    'id': 333,
    'title': 'Upgrade to super',
    'price': 1420
  },
  {
    'id': 444,
    'title': 'Seat place',
    'price': 6120
  },
  {
    'id': 555,
    'title': 'Upgrade to tree',
    'price': 543
  },
  {
    'id': 777,
    'title': 'By train',
    'price': 754
  },
  {
    'id': 7887,
    'title': 'By bus',
    'price': 32
  },
  {
    'id': 545,
    'title': 'By seat',
    'price': 324
  }
];

const getRandomOffer = () => getRandomArrayElement(mockOffers);
const getOfferByIndex = (index) => mockOffers[index];

export { getRandomOffer, getOfferByIndex, mockOffers };
