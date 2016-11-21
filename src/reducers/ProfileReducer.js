import {
  RESET_MESSAGE,
  RESET_ARTWORK,
  STORE_ARTWORK_TEMPORARILY,
  GET_USER_GROUP,
  PRODUCT_ADDED_SUCCESS,
  PRODUCT_ADDED_FAIL
 } from './../actions/types';

const INITIAL_STATE = {
  productArtwork: null,
  userGroup: null,
  userType: null,
  message: null,
};

import { REHYDRATE } from 'redux-persist/constants'

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_MESSAGE:
      return { ...state, message: null }
    case RESET_ARTWORK:
      return { ...state, productArtwork: null }
    case STORE_ARTWORK_TEMPORARILY:
      return { ...state, productArtwork: action.payload.uri }
    case GET_USER_GROUP:
      return { ...state, userGroup: action.payload, userType: action.payload.userGroup }
    case PRODUCT_ADDED_SUCCESS:
      return { ...state, message: action.payload }
    case PRODUCT_ADDED_FAIL:
      return { ...state, message: action.payload }
    case REHYDRATE:
      var incoming = action.payload.profile;
      if(incoming){
        return { ...state, ...incoming}
      } else {
        return state;
      }
    default:
      return state;
  }
}
