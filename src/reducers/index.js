import {combineReducers} from 'redux';

import auth from './authReducer';
import vet from './vetReducer';
import pet from './petReducer';
import appointment from './appointmentReducer';

export default combineReducers({
  auth,
  vet,
  pet,
  appointment,
});
