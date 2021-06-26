import {GET_ALL_USER_PETS} from '../constants/actionTypes';
import * as api from '../api/index';

export const getAllUserPets = (user_id, setIsLoading) => async dispatch => {
  try {
    const {data} = await api.getAllUserPets(user_id);
    setIsLoading(false);

    dispatch({type: GET_ALL_USER_PETS, data});
  } catch (err) {
    console.log(err);
  }
};
