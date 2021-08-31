import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { Provider } from 'react-redux';
import comicsReducer from './src/Store/Reducer/comics';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import productsReducer from './src/Store/Reducer/products'

import { NavigationContainer } from '@react-navigation/native';
import ShopNavigation from './src/Routes/ShopNavigation';

import { 
  useFonts, 
  OpenSans_400Regular, 
  OpenSans_600SemiBold, 
  OpenSans_700Bold 
} from '@expo-google-fonts/open-sans';

import AppLoading from 'expo-app-loading';


const rootReducer = combineReducers({
  comics: comicsReducer,
  products: productsReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <ShopNavigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}