console.disableYellowBox = true;
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import firebase from 'firebase';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import ReduxThunk from 'redux-thunk'

import reducers from './reducers';

import Router from './Router';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyCThyRVQ2k1vlTNgDn0WZ-lFLIgPsbUyIE",
      authDomain: "exquisite-52c79.firebaseapp.com",
      databaseURL: "https://exquisite-52c79.firebaseio.com",
      storageBucket: "exquisite-52c79.appspot.com",
      messagingSenderId: "1048577587736"
    });
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk), autoRehydrate());
    persistStore(store, {storage: AsyncStorage})
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
