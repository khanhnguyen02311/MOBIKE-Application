// import {
//   View,
//   Text,
//   Image,
//   Button,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   Keyboard,
// } from 'react-native';
// import React, {useEffect, useState} from 'react';
// import Container from '../../components/common/container';
// import {REGISTRATION} from '../../constants/routeNames';
// import TextInputOutline from '../../components/common/textInputOutline-Kohana';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import {useDispatch} from 'react-redux';
// import {login} from '../../redux/slice/authSlice';
// import CustomButton from '../../components/common/customButton';

import LoginComponent from '../../components/Login';

const Login = ({navigation}) => {
  // const [username, setUsername] = useState({});
  // const [password, setPassword] = useState({});

  // const dispatch = useDispatch();

  // const handleUsernameChange = value => {
  //   setUsername(value);
  // };

  // const handlePasswordChange = value => {
  //   setPassword(value);
  // };

  // const handleLoginButton = () => {
  //   if (username === 'admin' && password === 'admin') {
  //     dispatch(login({date: '01', month: '01', year: '2021'}));
  //     console.log('Login success');
  //   }
  // };

  return <LoginComponent />;
};



export default Login;
