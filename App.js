import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { combineReducers, createStore } from 'redux';
import { Provider } from  'react-redux';
import { AppLoading } from 'expo';

import { composeWithDevTools } from 'redux-devtools-extension'

import * as Font from 'expo-font';

import Main from './navigation/ShopNavigator'

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer
})

const store = createStore( rootReducer, composeWithDevTools() );

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [ fontLoaded, setFontLoaded ] = useState(false);
  if(!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => {
      setFontLoaded(true);
    }}/>
  }
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
