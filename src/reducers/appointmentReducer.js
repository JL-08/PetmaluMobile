import {
  GET_ALL_USER_APPOINTMENTS,
  GET_ALL_VET_APPOINTMENTS,
  GET_APPOINTMENTS_BY_STATUS,
} from '../constants/actionTypes';

const appointmentReducer = (state = {appointmentData: null}, action) => {
  switch (action.type) {
    case GET_ALL_USER_APPOINTMENTS:
      return {
        ...state,
        appointmentData: action.data,
      };

    case GET_ALL_VET_APPOINTMENTS:
      return {
        ...state,
        vetAppointmentsData: action.data,
      };

    case GET_APPOINTMENTS_BY_STATUS:
      return {
        ...state,
        appointmentsData: action.data,
      };

    default:
      return state;
  }
};

export default appointmentReducer;
