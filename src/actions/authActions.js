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

export const login =
  (
    formData,
    setServerMessage,
    setIsRequestComplete,
    setHasRequestError,
    setIsLoading,
    navigation,
  ) =>
  async dispatch => {
    try {
      const {data} = await api.login(formData);
      setIsLoading(false);

      if (
        data.includes(
          'Incorrect email or password' || data.includes('Connection Failed'),
        )
      ) {
        setServerMessage(data);
        setIsRequestComplete(true);
        setHasRequestError(true);
      } else {
        dispatch({type: AUTH, data});
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      }
    } catch (err) {
      console.log(err);
    }
  };
