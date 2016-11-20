import { Actions } from 'react-native-router-flux';

import {
  PULL_PRODUCT_DATA,
  BUY_ITEM_SUCCESS,
  BUY_ITEM_FAIL
 } from './../actions/types';

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
    default:
      return state;
  }
}
