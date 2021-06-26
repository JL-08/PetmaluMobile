import {GET_ALL_USER_PETS} from '../constants/actionTypes';

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case GET_ALL_USER_PETS:
      return {
        ...state,
        petData: action.data,
      };

    default:
      return state;
  }
};

export default authReducer;
