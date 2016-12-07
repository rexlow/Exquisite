import _ from 'lodash';
import firebase from 'firebase';
import {
  PULL_PRODUCT_DATA,
  BUY_ITEM_SUCCESS,
  BUY_ITEM_FAIL,
  RESET_PURCHASE_MESSAGE,
  ADD_TO_BASKET_SUCCESS,
  ADD_TO_BASKET_FAIL,
  REMOVE_ITEM_FROM_BASKET_SUCCESS,
  REMOVE_ITEM_FROM_BASKET_FAIL
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

//todo
export function buyItemArray(products, remainingCredit, basketObject) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    console.log(products);
    console.log(remainingCredit);
    console.log(basketObject);

    Object.keys(basketObject).forEach(
      (key) => console.log(basketObject[key].uid)
    )

    // update purchasedItem node
    firebase.database().ref(`Users/${currentUser.uid}`).update({
      purchasedItem: products,
      credit: remainingCredit
    })
    .then(() => {
      //update purchasedUser node with looping, might cause Firebase complain
      Object.keys(basketObject).forEach((key) =>
        firebase.database().ref(`Product/${basketObject[key].uid}/purchasedUser`).update({ [currentUser.uid]: true })
          .then(() => console.log('done adding user to purchasedUser'))
          .catch((error) => console.log(error.message))
      )
      //remove basket items
      firebase.database().ref(`Users/${currentUser.uid}/basketList`).remove()
        .then(() => dispatch({ type: BUY_ITEM_SUCCESS, payload: 'Purchase item successfully' }))
        .catch((error) => console.log(error.message))
    })
    .catch(() => dispatch({ type: BUY_ITEM_FAIL, payload: 'Sorry, please try again later' }));
  }
}

export function resetPurchaseMessage() {
  return {
    type: RESET_PURCHASE_MESSAGE
  };
};

export function addToBasket(productID) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users/${currentUser.uid}/basketList`).update({ [productID]: true })
      .then(() => dispatch({ type: ADD_TO_BASKET_SUCCESS, payload: 'Product added into basket' }))
      .catch(() => dispatch({ type: ADD_TO_BASKET_FAIL, payload: 'Sorry, please try again later' }))
  };
};

export function removeFromBasket(productID) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users/${currentUser.uid}/basketList/${productID}`).remove()
      .then(() => dispatch({ type: REMOVE_ITEM_FROM_BASKET_SUCCESS, payload: 'Product removed!' }))
      .catch((error) => dispatch({ type: REMOVE_ITEM_FROM_BASKET_FAIL, payload: 'Something went wrong'}))
  };
};
