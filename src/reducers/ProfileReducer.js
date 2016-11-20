import {
  GET_USER_GROUP
 } from './../actions/types';

const INITIAL_STATE = {
 userGroup: null,
 userType: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USER_GROUP:
      return { ...state, userGroup: action.payload, userType: action.payload.userGroup }
    default:
      return state;
  }
}
