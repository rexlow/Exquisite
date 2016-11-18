import firebase from 'firebase';
import {
  LISTEN_TO_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAIL
} from './types';

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: SIGNIN_USER_SUCCESS,
    payload: user
  });
};

const authFail = (dispatch, error) => {
  dispatch({
    type: SIGNIN_USER_FAIL,
    payload: {
      error: error.message
    }
  });
};

export function listenToUser() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      dispatch({
        type: LISTEN_TO_USER,
        payload: user
      });
    });
  };
};

export function loginUser(email, password) {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
     .then(user => loginUserSuccess(dispatch, user))
     .catch((error) => authFail(dispatch, error));
  };
};
