import {GET_ALL_FAQS} from '../constants/actionTypes';

const faqsReducer = (state = {faqsData: null}, action) => {
  switch (action.type) {
    case GET_ALL_FAQS:
      return {
        ...state,
        faqsData: action.data,
      };

    default:
      return state;
  }
};

export default faqsReducer;
