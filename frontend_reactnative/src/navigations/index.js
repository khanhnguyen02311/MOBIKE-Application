import {Gesture} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationNavigator from './AuthenticationNavigator';
import {GlobalContext} from '../context/Provider';
import BottomNavigator from './BottomNavigator';
import { useSelector } from 'react-redux';

const AppNavContainer = () => {
  // const {
  //   authState: {isLoggedIn},
  // } = useContext(GlobalContext);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomNavigator></BottomNavigator>
      ) : (
        <AuthenticationNavigator></AuthenticationNavigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavContainer;
