import {GET_ALL_POSTS} from '../constants/actionTypes';

const postReducer = (state = {postData: null}, action) => {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        postData: action.data,
      };

    default:
      return state;
  }
};

export default postReducer;
