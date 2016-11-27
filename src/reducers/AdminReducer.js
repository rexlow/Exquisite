import {
  APPROVE_PRODUCT_SUCCESS,
  APPROVE_PRODUCT_FAIL,
  REJECT_PRODUCT_SUCCESS,
  REJECT_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  RESET_APPROVE_MESSAGE
 } from './../actions/types';

 const INITIAL_STATE = { adminMessage: null };

 export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
     case APPROVE_PRODUCT_SUCCESS:
       return { ...state, adminMessage: "Product Approved!"};
     case APPROVE_PRODUCT_FAIL:
       return { ...state, adminMessage: "Sorry, please try again later!"};
     case REJECT_PRODUCT_SUCCESS:
       return { ...state, adminMessage: "Product Disproved!"};
     case REJECT_PRODUCT_FAIL:
       return { ...state, adminMessage: "Sorry, please try again later!"};
     case DELETE_PRODUCT_SUCCESS:
       return { ...state, adminMessage: "Product Deleted!"};
     case DELETE_PRODUCT_FAIL:
       return { ...state, adminMessage: "Sorry, please try again later!"};
     case RESET_APPROVE_MESSAGE:
       return INITIAL_STATE;
     default:
       return state;

   }
 }
