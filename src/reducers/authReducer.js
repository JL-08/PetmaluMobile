import {AUTH, VET_AUTH, LOGOUT, VERIFY} from '../constants/actionTypes';

let data;

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action.data[0]);

      return {
        ...state,
        authData: {...action.data[0], role: 'user'},
      };

    case VET_AUTH:
      console.log(action.data[0]);

      return {
        ...state,
        authVetData: {...action.data[0], role: 'vet'},
      };

    case LOGOUT:
      return {...state, authData: null};

    case VERIFY:
      return {
        ...state,
        authData: JSON.parse(localStorage.getItem('profile')),
      };

    default:
      return state;
  }
};

export default authReducer;
