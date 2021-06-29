import {GET_ALL_USER_APPOINTMENTS} from '../constants/actionTypes';

const appointmentReducer = (state = {appointmentData: null}, action) => {
  switch (action.type) {
    case GET_ALL_USER_APPOINTMENTS:
      return {
        ...state,
        appointmentData: action.data,
      };

    default:
      return state;
  }
};

export default appointmentReducer;
