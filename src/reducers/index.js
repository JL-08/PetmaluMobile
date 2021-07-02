import {combineReducers} from 'redux';

import auth from './authReducer';
import vet from './vetReducer';
import pet from './petReducer';
import appointment from './appointmentReducer';
import post from './postReducer';

export default combineReducers({
  auth,
  vet,
  pet,
  appointment,
  post,
});
