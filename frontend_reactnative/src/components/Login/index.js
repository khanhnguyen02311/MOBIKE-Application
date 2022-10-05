import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/common/container';
import {FORGOTPASSWORD, REGISTRATION} from '../../constants/routeNames';
import TextInputOutline from '../../components/common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {login} from '../../redux/slice/authSlice';
import CustomButton from '../../components/common/customButton';
import {useDispatch} from 'react-redux';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {Checkbox} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginComponent = () => {
  const {navigate} = useNavigation();
  const [checked, setChecked] = useState();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[styles.wrapper, {height: '100%', backgroundColor: 'white'}]}>
        <View>
          <Image
            source={require('../../assets/images/MoBike.png')}
            style={styles.logo}
          />
          <Text style={styles.boldText}>Sign in to your account</Text>

          <View style={styles.form}>
            <TextInputOutline
              label={'Username'}
              iconClass={Ionicons}
              iconName={'person'}
              iconColor={'#90B4D3'}
              inputPadding={12}
              borderWidthtoTop={0}
              //onChangeText={handleUsernameChange}
            />
            <TextInputOutline
              label={'Password'}
              iconClass={MaterialCommunityIcons}
              iconName={'lock'}
              iconColor={'#90B4D3'}
              inputPadding={12}
              borderWidthtoTop={0}
              inputType="password"
              //onChangeText={handlePasswordChange}
            />

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 5,
                paddingBottom: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text style={{fontSize: 12}}>Remember my account</Text>
              </View>

              <TouchableWithoutFeedback
                onPress={() => navigate(FORGOTPASSWORD)}>
                <Text style={{fontSize: 12}}>Forgot Password ?</Text>
              </TouchableWithoutFeedback>
            </View>

            <CustomButton
              //onPress={}
              title="Sign in"
              primary
              styleTitle={{fontSize: 18, fontWeight: 'bold'}}
              styleWrapper={{
                borderRadius: 62,
                width: '50%',
                alignSelf: 'center',
                height: 46,
              }}
            />

            <View style={{alignSelf: 'center', paddingTop: 50}}>
              <Text
                style={{alignSelf: 'center', paddingBottom: 10, fontSize: 12}}>
                Or login with:
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback>
                  <Image
                    source={require('../../assets/images/logo_facebook.png')}
                    style={{width: 40, height: 40, marginEnd: 10}}
                  />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback>
                  <Image
                    source={require('../../assets/images/logo_google.png')}
                    style={{width: 40, height: 40, marginStart: 10}}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={() => navigate(REGISTRATION)}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  paddingEnd: 5,
                  color: 'black',
                }}>
                Join us now!
              </Text>
              <Text style={{fontSize: 14, fontStyle: 'italic'}}>
                Create your account here
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginComponent;
