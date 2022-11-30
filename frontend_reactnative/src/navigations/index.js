import {Gesture} from 'react-native-gesture-handler';
import {View, Text} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthenticationNavigator from './AuthenticationNavigator';
import {GlobalContext} from '../context/Provider';
import BottomNavigator from './BottomNavigator';
import {useSelector} from 'react-redux';
import YourPosts from '../screens/YourPosts';

const AppNavContainer = () => {
  // const {
  //   authState: {isLoggedIn},
  // } = useContext(GlobalContext);

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isLoading = useSelector(state => state.loading.loading);
  return (
    <NavigationContainer>
<<<<<<< HEAD
      {true ? (
=======
      {isLoggedIn ? (
>>>>>>> fade66b9a22c5ce8c31c07ec462aea94a4680f64
        <BottomNavigator></BottomNavigator>
      ) : (
        <AuthenticationNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavContainer;
