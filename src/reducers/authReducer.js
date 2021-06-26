import {AUTH, GOOGLE_AUTH, LOGOUT, GET_AUTH} from '../constants/actionTypes';

let data;

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action.data[0]);

      return {
        ...state,
        authData: {...action.data[0], role: 'user'},
      };

    case LOGOUT:
      return {...state, authData: null};

    case GET_AUTH:
      return {
        ...state,
        authData: JSON.parse(localStorage.getItem('profile')),
      };

    default:
      return state;
  }
};

export default authReducer;
