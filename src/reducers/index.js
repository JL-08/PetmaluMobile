import {combineReducers} from 'redux';

import auth from './authReducer';
import vet from './vetReducer';
import pet from './petReducer';

export default combineReducers({
  auth,
  vet,
  pet,
});
