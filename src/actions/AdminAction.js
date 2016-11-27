import firebase from 'firebase';
import {
  APPROVE_PRODUCT_SUCCESS,
  APPROVE_PRODUCT_FAIL,
  REJECT_PRODUCT_SUCCESS,
  REJECT_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  RESET_APPROVE_MESSAGE
} from './types';

export function approveProduct(uid) {
  return (dispatch) => {
    firebase.database().ref(`/Product/${uid}`).update({
      approved: true
    })
      .then(() => dispatch({ type: APPROVE_PRODUCT_SUCCESS }))
      .catch((error) => dispatch({ type: APPROVE_PRODUCT_FAIL }))
  };
};

export function rejectProduct(uid) {
  return (dispatch) => {
    firebase.database().ref(`/Product/${uid}`).update({
      approved: false
    })
      .then(() => dispatch({ type: REJECT_PRODUCT_SUCCESS }))
      .catch((error) => dispatch({ type: REJECT_PRODUCT_FAIL }))
  };
}

export function deleteProduct(uid) {
  return (dispatch) => {
    firebase.database().ref(`/Product/${uid}`).remove()
      .then(() => dispatch({ type: DELETE_PRODUCT_SUCCESS }))
      .catch((error) => dispatch({ type: DELETE_PRODUCT_FAIL }))
  };
}

export function resetApproveMessage() {
  return {
    type: RESET_APPROVE_MESSAGE
  }
}
