import {GET_ALL_USER_APPOINTMENTS} from '../constants/actionTypes';
import * as api from '../api/index';

export const getAllUserAppointments =
  (user_id, setIsLoading) => async dispatch => {
    try {
      const {data} = await api.getAllUserAppointments(user_id);
      setIsLoading(false);

      dispatch({type: GET_ALL_USER_APPOINTMENTS, data});
    } catch (err) {
      console.log(err);
    }
  };

export const createAppointment =
  (
    appointmentData,
    setServerMessage,
    setIsRequestComplete,
    setHasRequestError,
    setIsLoading,
  ) =>
  async dispatch => {
    try {
      const {data} = await api.createAppointment(appointmentData);
      setIsLoading(false);

      if (data.includes('You have successfully booked this appointment')) {
        setServerMessage(data);
        setIsRequestComplete(true);
      }

      if (data.includes("Sorry, this date isn't available")) {
        setServerMessage(data);
        setIsRequestComplete(true);
        setHasRequestError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
