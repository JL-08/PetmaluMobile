import {GET_ALL_FAQS} from '../constants/actionTypes';
import * as api from '../api/index';

export const getAllFaqs = setIsLoading => async dispatch => {
  try {
    const {data} = await api.getAllFaqs();
    setIsLoading(false);

    dispatch({type: GET_ALL_FAQS, data});
  } catch (err) {
    console.log(err);
  }
};
