import { Actions } from 'react-native-router-flux';

import {
  PULL_PRODUCT_DATA
 } from './../actions/types';

const INITIAL_STATE = { productList: {}, message: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PULL_PRODUCT_DATA:
      return { ...state, productList: action.payload }
    default:
      return state;
  }
}
