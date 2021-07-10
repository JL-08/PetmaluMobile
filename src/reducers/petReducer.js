import {GET_ALL_USER_PETS, GET_PET} from '../constants/actionTypes';

const petReducer = (state = {petData: null}, action) => {
  switch (action.type) {
    case GET_ALL_USER_PETS:
      return {
        ...state,
        petData: action.data,
      };

    case GET_PET:
      return {
        ...state,
        petDetails: action.data[0],
      };

    default:
      return state;
  }
};

export default petReducer;
