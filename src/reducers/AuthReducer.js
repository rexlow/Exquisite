import { Actions } from 'react-native-router-flux';

import {
  LISTEN_TO_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAIL
 } from './../actions/types';

const INITIAL_STATE = { user: null, error: null }; // no user yet
const EXIST_STATE = { user: {}, error: null }; //user already exist

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LISTEN_TO_USER:
      if(!action.payload) {
         return EXIST_STATE;
       }
       return {
         user: {
           email: action.payload.email,
           uid: action.payload.uid,
           userDisplayName: action.payload.displayName
         },
         error: null
       };
    default:
      return state;
  }
}
