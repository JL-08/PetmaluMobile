import {GET_ALL_VETS} from '../constants/actionTypes';
import * as api from '../api/index';

export const getAllVets = setIsLoading => async dispatch => {
  try {
    const {data} = await api.getAllVets();
    setIsLoading(false);

    dispatch({type: GET_ALL_VETS, data});
  } catch (err) {
    console.log(err);
  }
};
