import firebase from 'firebase';
import {
  PULL_PRODUCT_DATA,
  BUY_ITEM_SUCCESS,
  BUY_ITEM_FAIL
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

export function buyItem(productID) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users/${currentUser.uid}/purchasedItem`).update({ [productID]: true })
      .then(() => dispatch({ type: BUY_ITEM_SUCCESS, payload: 'Purchase item successfully' }))
      .catch(() => dispatch({ type: BUY_ITEM_FAIL, payload: 'Sorry, please try again later' }));
    firebase.database().ref(`/Product/${productID}/purchasedUser`).update({ [currentUser.uid]: true })
      .then(() => console.log('update product parent'))
      .catch(() => console.log('error'));
  };
}
