import {AUTH, GOOGLE_AUTH, LOGOUT, GET_AUTH} from '../constants/actionTypes';

let data;

const authReducer = (state = {authData: null}, action) => {
  switch (action.type) {
    case AUTH:
      data = {
        firstName: action?.data?.data?.user?.firstName,
        lastName: action?.data?.data?.user?.lastName,
        role: action?.data?.data?.user?.role,
      };

      localStorage.setItem('profile', JSON.stringify(data));
      return {
        ...state,
        authData: {...data, token: action?.data?.token},
      };

    case LOGOUT:
      localStorage.clear();
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
