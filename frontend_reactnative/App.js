import { Gesture } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/Provider';
import { store } from './src/redux/store';
import { Provider, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenStorage from './src/backendAPI/TokenStorage';
import BackendAPI from './src/backendAPI/BackendAPI';
import {test} from './src/backendAPI/ClientDatabase';


import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#90B4D3',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3',
  },
};
const App = () => {
  useEffect(() => {
    //AsyncStorage.clear();
    console.log('Main')
    const fetch = async () => {
      await TokenStorage.init();

    }
    
    const sandbox = async () => {
      try {
        await test();
      } catch (error) {
        console.log("Sandbox error: " + error);
      }

    }
    fetch();
    sandbox();

  }, []);

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavContainer></AppNavContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
