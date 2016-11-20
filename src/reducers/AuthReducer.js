import { Actions } from 'react-native-router-flux';

import {
  LISTEN_TO_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  SIGNOUT_USER
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
    case SIGNIN_USER_SUCCESS:
      return {
         user: {
           email: action.payload.email,
           uid: action.payload.uid
         },
         error: null
       };
    case SIGNIN_USER_FAIL:
      return {
        error: action.payload.error
      }
    case REGISTER_USER_SUCCESS:
       return EXIST_STATE;
    case REGISTER_USER_FAIL:
      return {
        error: action.payload.error
      }
    case SIGNOUT_USER:
       return INITIAL_STATE;
    default:
      return state;
  }
}
