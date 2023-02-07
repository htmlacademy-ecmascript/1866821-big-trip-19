const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
  CANCEL_POINT_EDIT: 'CANCEL_POINT_EDIT'
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  CLEAR: 'CLEAR'
};

const BlockerMessage = {
  LOAD: 'Loading...',
  NO_DATA: 'Something went wrong try again later...'
};

const BlockerTimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  UserAction,
  UpdateType,
  BlockerMessage,
  BlockerTimeLimit
};
