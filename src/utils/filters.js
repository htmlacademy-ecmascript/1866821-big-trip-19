import {Filters} from '../const/filters.js';
import { dateInPast, dateInFuture, dateInPresent } from './date.js';

const filter = {
  [Filters.EVERYTHING]: (points) => points,
  [Filters.PAST]: (points) => points.filter((point) => dateInPast(point.dateTo)),
  [Filters.FUTURE]: (points) => points.filter((point) => dateInFuture(point.dateFrom)),
  [Filters.PRESENT]: (points) => points.filter((point) => dateInPresent(point.dateFrom, point.dateTo)),
};

export {filter};
