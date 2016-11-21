import _ from 'lodash';
import firebase from 'firebase';
import {
  RESET_MESSAGE,
  RESET_ARTWORK,
  GET_USER_GROUP,
  STORE_ARTWORK_TEMPORARILY,
  PRODUCT_ADDED_SUCCESS,
  PRODUCT_ADDED_FAIL
} from './types';

//talk to database and get user group
export function getUserGroup() {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Users`)
      .once('value', snapshot => {
        var userData = _.values(snapshot.val());
        for (var i = 0; i < userData.length; i++) {
          if (userData[i].email === currentUser.email) {
            dispatch({
              type: GET_USER_GROUP,
              payload: userData[i]
            });
          };
        };
      });
  };
};

export function resetMessage() {
  return {
    type: RESET_MESSAGE
  };
};

export function resetProductArtwork() {
  return {
    type: RESET_ARTWORK
  };
};

//dont persist image
export function storeArtwork(source) {
  return {
    type: STORE_ARTWORK_TEMPORARILY,
    payload: source
  };
};

export function submitProduct(brand, category, color, description, imageToUpload, name, price, size) {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/Product/`).push({
      brand: brand,
      category: category,
      color: color,
      description: description,
      imageURL: imageToUpload,
      name: name,
      price: price,
      size: size
    }).then(() => dispatch({ type: PRODUCT_ADDED_SUCCESS, payload: 'Congratz! Your product is being added' }))
      .catch((error) => dispatch({ type: PRODUCT_ADDED_FAIL, payload: 'Sorry, something happened. Please try again later' }))
  }
};
