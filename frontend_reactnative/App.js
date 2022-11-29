import { Gesture } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/Provider';
import Store from './src/redux/store';
import { Provider, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenStorage from './src/services/TokenStorage';
import BackendAPI from './src/backendAPI';
import ClientDatabase from './src/services/ClientDatabase';
import Requester, { SetHost } from './src/backendAPI/HttpRequest';

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import { addImageType, setImageTypes } from './src/redux/clientDatabase/imageType';

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
      await ClientDatabase.init();
    }
    
    const sandbox = async () => {
      try {
        //await init();
        //await printClientDatabase();
        console.log("Sandbox");

        // SetHost().then((v) => {
        //   console.log("Host set to: " + v);
        // })

      } catch (error) {
        console.log("Sandbox error: " + error);
      }
    }
    fetch();
    //sandbox();

  }, []);

  return (
    <Provider store={Store}>
      <PaperProvider theme={theme}>
        <AppNavContainer></AppNavContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
