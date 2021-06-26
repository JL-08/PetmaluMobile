import {AUTH} from '../constants/actionTypes';
import * as api from '../api/index';

export const register =
  (
    formData,
    petFormData,
    setServerMessage,
    setIsRequestComplete,
    setHasRequestError,
    setIsLoading,
  ) =>
  async dispatch => {
    try {
      const {data} = await api.register(formData, petFormData);
      setIsLoading(false);
      setServerMessage(data);
      setIsRequestComplete(true);

      if (!data.includes('Registration successful')) {
        setHasRequestError(true);
      } else {
        setHasRequestError(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

export const login = formData => async dispatch => {
  try {
    const {data} = await api.login(formData);

    dispatch({type: AUTH, data});
  } catch (err) {
    console.log(err);
  }
};
