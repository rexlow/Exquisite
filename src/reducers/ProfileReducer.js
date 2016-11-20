import {
  GET_USER_GROUP,
 } from './../actions/types';

const INITIAL_STATE = {
  userGroup: null,
  userType: null,
};

import { REHYDRATE } from 'redux-persist/constants'

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
