import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { combineReducers, createStore } from 'redux';
import { Provider } from  'react-redux';

import Main from './navigation/ShopNavigator'

import productsReducer from './store/reducers/products';

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
