import firebase from 'firebase';
import {
  PULL_PRODUCT_DATA
} from './types';

export function pullProductData() {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Product`)
      .on('value', snapshot => {
        dispatch({
          type: PULL_PRODUCT_DATA,
          payload: snapshot.val()
        });
      });
  };
};
