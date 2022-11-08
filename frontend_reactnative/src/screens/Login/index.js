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
import BackendAPI from '../../backendAPI/BackendAPI';
import React from 'react';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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

  const [form, setForm] = React.useState({});

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const login = async () => {
    console.log("Login Submitted")
    await BackendAPI.signIn(form.username, form.password)
  };

  const onSubmit = () => {
    login();
  };

  const onTest = () => {
    console.log("Test")
    openGallery()
  };

  const openGallery = async () => {
    const result = await launchImageLibrary();
    console.log(result);
    saveImageToServer(result.assets[0]);
  }

  const saveImageToServer = async (image) => {
    try {
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      type: image.type,
      name: image.fileName,
    });
    console.log("formData: ", JSON.stringify(formData));
    const response = await fetch("http://172.30.163.113:3001/upload", {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const data = await response.json();
    console.log(data);
    } catch (error) {
      console.log("Save Image Error: " + error);
    }
  }

  return <LoginComponent
    onChange={onChange}
    onSubmit={onSubmit}
    onTest={onTest}
  />;
};



export default Login;
