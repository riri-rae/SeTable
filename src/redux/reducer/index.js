import { combineReducers } from 'redux';

import currentTimezone from './currentTimezone';
import timezones from './timezones';
import clocks from './clocks';
import user from './user';

const reducers = combineReducers({
  currentTimezone,
  timezones,
  clocks,
  user,
});

export default reducers;
