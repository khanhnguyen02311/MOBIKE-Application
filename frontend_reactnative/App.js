import {Gesture} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/Provider';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenStorage from './src/backendAPI/TokenStorage';
import { signIn, me } from './src/backendAPI/database';
import { login } from './src/redux/slice/authSlice';
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
    console.log('\n')
    const fetch = async () => {
      await TokenStorage.init();
      await TokenStorage.print();
      await signIn("Khoa", "123456789");
      currentToken = await TokenStorage.getCurrentToken();
      if (currentToken != "" && currentToken != null) {
        console.log("Current token: " + currentToken);
        me(currentToken);

      }
      

    }
    fetch();

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
