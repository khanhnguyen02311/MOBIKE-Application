import { Gesture } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/Provider';
import Store from './src/redux/store';
import { setLoading } from './src/redux/slice/loadingSlice';
import { Provider, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenStorage from './src/services/TokenStorage';
import BackendAPI, { getPersonalInfo } from './src/backendAPI';
import ClientDatabase from './src/services/ClientDatabase';
import Requester, { BigGetRequest } from './src/backendAPI/HttpRequest';

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import { addImageType, setImageTypes } from './src/redux/clientDatabase/imageType';
import HttpRequest from './src/backendAPI/HttpRequest';

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
    AsyncStorage.clear();
    console.log('------------------------------Main------------------------------')

    
    // const sandbox = async () => {
    //   try {
    //       // const cities = await BigGetRequest("cities");
    //       // console.log(cities);
    //     console.log("......................Sandbox......................")
    //     let test = Store.getState().personalInfo;
    //     console.log(test)
    //   } catch (error) {
    //     console.log("Sandbox error: " + error);
    //   }
    //   console.log("....................Sandbox End....................")
    // }

    const Init = async () => {
      // await TokenStorage.removeCurrentToken();
      await TokenStorage.init();
      await ClientDatabase.init();
      // TokenStorage.print();
      // ClientDatabase.print();
      // let test = Store.getState().locations.Tree;
      // console.log("Test: " + JSON.stringify(test));
      Store.dispatch(setLoading(false));
      console.log("......................App loading finished......................")
      // await sandbox();
    }
    Init();

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
