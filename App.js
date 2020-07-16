import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { combineReducers, createStore , applyMiddleware } from 'redux';
import { Provider } from  'react-redux';
import { AppLoading } from 'expo';
import ReduxThunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'

import * as Font from 'expo-font';

import Main from './navigation/ShopNavigator'

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from  './store/reducers/orders';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
})

const store = createStore( rootReducer, applyMiddleware(ReduxThunk) );

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
