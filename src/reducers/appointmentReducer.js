import {
  GET_ALL_USER_APPOINTMENTS,
  GET_APPOINTMENTS_FOR_APPROVAL,
} from '../constants/actionTypes';

const appointmentReducer = (state = {appointmentData: null}, action) => {
  switch (action.type) {
    case GET_ALL_USER_APPOINTMENTS:
      return {
        ...state,
        appointmentData: action.data,
      };

    case GET_APPOINTMENTS_FOR_APPROVAL:
      return {
        ...state,
        appointmentsForApprovalData: action.data,
      };

    default:
      return state;
  }
};

export default appointmentReducer;
