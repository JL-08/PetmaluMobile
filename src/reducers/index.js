import {combineReducers} from 'redux';

import auth from './authReducer';
import vet from './vetReducer';
import pet from './petReducer';
import appointment from './appointmentReducer';
import post from './postReducer';
import faq from './faqsReducer';

export default combineReducers({
  auth,
  vet,
  pet,
  appointment,
  post,
  faq,
});
