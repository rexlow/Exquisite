import {
  RESET_ARTWORK,
  GET_USER_GROUP,
 } from './../actions/types';

const INITIAL_STATE = {
  productArtwork: null,
  userGroup: null,
  userType: null,
};

import { REHYDRATE } from 'redux-persist/constants'

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_ARTWORK:
      return { ...state, productArtwork: null }
    case GET_USER_GROUP:
      return { ...state, userGroup: action.payload, userType: action.payload.userGroup }
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
