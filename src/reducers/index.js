import {combineReducers} from 'redux';

import auth from './authReducer';
import vet from './vetReducer';

export default combineReducers({
  auth,
  vet,
});
