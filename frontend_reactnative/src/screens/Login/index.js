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
import BackendAPI from '../../backendAPI';
import HttpRequest from '../../backendAPI/HttpRequest';
import TokenStorage from '../../services/TokenStorage';
import React from 'react';
import { Linking } from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import LoginComponent from '../../components/Login';

import {authorize} from 'react-native-app-auth';
import auth from './../../context/reducers/auth';

const config = {
  issuer: 'https://accounts.google.com',
  clientId: '681579473082-k52dgdcgg1vte6tlp9krmj75dbefecel.apps.googleusercontent.com',
  redirectUrl: 'https://abcdavid-knguyen.ddns.net:30001/auth/signin/google/authorize',
  scopes: ['openid', 'profile', 'email'],
};


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

  const [form, setForm] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const login = async () => {
    console.log('Login Submitted');
    await TokenStorage.signIn(form.username, form.password);
  };

  const onSubmit = () => {
    setIsLoading(true);
    login();
  };

  const onTest = () => {
    console.log('Test');
    openGallery();
  };

  const openGallery = async () => {
    const result = await launchImageLibrary();
    console.log(result);
    saveImageToServer(result.assets[0]);
  };

  const saveImageToServer = async image => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        // type: image.type,
        // name: image.fileName,
      });
      console.log('formData: ', JSON.stringify(formData));
      const response = await fetch('http://172.30.163.113:3001/upload', {
        method: 'POST',
        body: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log('Save Image Error: ' + error);
    }
  };

  const openURL = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Unable to open URL: " + url);
      }
    } catch (error) {
      console.error("An error occurred while opening the URL: " + error);
    }
  };

  const OnSigninWithGoogle = async () => {
    console.log('Signin with Google');
    try {
      const result = await authorize(config);
      console.log("Res: " + JSON.stringify(result));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <LoginComponent onChange={onChange} onSubmit={onSubmit} onTest={onTest} OnSigninWithGoogle={OnSigninWithGoogle} />
  );
};

export default Login;
