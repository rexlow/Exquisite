import { Actions } from 'react-native-router-flux';

import {
  PULL_PRODUCT_DATA,
  BUY_ITEM_SUCCESS,
  BUY_ITEM_FAIL,
  RESET_PURCHASE_MESSAGE,
  ADD_TO_BASKET_SUCCESS,
  ADD_TO_BASKET_FAIL
 } from './../actions/types';

 import { REHYDRATE } from 'redux-persist/constants'

const INITIAL_STATE = { productList: {}, message: null };

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PULL_PRODUCT_DATA:
      return { ...state, productList: action.payload }
    case BUY_ITEM_SUCCESS:
      return { ...state, message: action.payload }
    case BUY_ITEM_FAIL:
      return { ...state, message: action.payload }
    case RESET_PURCHASE_MESSAGE:
      return { ...state, message: null }
    case ADD_TO_BASKET_SUCCESS:
      return { ...state, message: action.payload }
    case ADD_TO_BASKET_FAIL:
      return { ...state, message: action.payload }
    case REHYDRATE:
      var incoming = action.payload.api; //return double object, one for online one for local
      if(incoming){
        return { ...state, ...incoming }
      } else {
        return state;
      }
    default:
      return state;
  }
}
