import {Gesture} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React from 'react';
import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/Provider';
import {store} from './src/redux/store';
import {Provider} from 'react-redux';
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
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavContainer></AppNavContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
