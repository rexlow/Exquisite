import firebase from 'firebase';
import {
  LISTEN_TO_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  SIGNOUT_USER
} from './types';

import { Actions } from 'react-native-router-flux';

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: SIGNIN_USER_SUCCESS,
    payload: user
  });
};

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: SIGNIN_USER_FAIL,
    payload: {
      error: error.message
    }
  });
};

const registerUserSuccess = (dispatch, user) => {
  dispatch({
    type: REGISTER_USER_SUCCESS,
    payload: user
  });
};

const registerUserFail = (dispatch, error) => {
  dispatch({
    type: REGISTER_USER_FAIL,
    payload: {
      error: error.message
    }
  });
};

function createUserRef(email, firstName, lastName) {
  const { currentUser } = firebase.auth();
   firebase.database().ref(`/Users/${currentUser.uid}`).set({
     email: email,
     firstName: firstName,
     lastName: lastName,
     userGroup: 'Normal User',
     credit: 0,

   });
};

function updateUserProfile(firstName, lastName) {
  const user = firebase.auth().currentUser;
  user.updateProfile({
    displayName: [firstName] + ' ' + [lastName],
  })
    .then(() => console.log('Set displayName successful'))
    .catch((error) => console.log(error));
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
     .catch((error) => loginUserFail(dispatch, error));
  };
};

export function registerUser(email, password, firstName, lastName) {
  return (dispatch) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
     .then(user => {
       registerUserSuccess(dispatch, user)
       createUserRef(email, firstName, lastName)
       updateUserProfile(firstName, lastName)
     })
     .catch((error) => registerUserFail(dispatch, error));
  };
};

export function signOut() {
  firebase.auth().signOut();
  Actions.auth({ type: 'reset' });
  return {
    type: SIGNOUT_USER
  };
};
