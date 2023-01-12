import {getRandomArrayElement} from '../utils/common.js';

const mockDestinations = [
  {
    id: '11',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: '22',
    description: 'Vena, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Vena',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Vena parliament building'
      }
    ]
  },
  {
    id: '33',
    description: 'Moscow, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Moscow',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Moscow parliament building'
      }
    ]
  },
  {
    id: '44',
    description: 'Paris, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Paris',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Paris parliament building'
      }
    ]
  }
];

const getRandomDestination = () => getRandomArrayElement(mockDestinations);


export {getRandomDestination, mockDestinations};
