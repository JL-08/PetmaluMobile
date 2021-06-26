import {GET_ALL_VETS} from '../constants/actionTypes';

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case GET_ALL_VETS:
      return {
        ...state,
        authData: action.data,
      };

    default:
      return state;
  }
};

export default authReducer;
