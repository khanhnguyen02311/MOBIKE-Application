import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import colors from '../../assets/theme/colors';
import {EDIT_ACCOUNT, EDIT_PTOFILE} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';

const ProfileComponent = () => {
  const {navigate} = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableWithoutFeedback onPress={() => navigate(EDIT_PTOFILE)}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            padding: 10,
            borderRadius: 5,
            backgroundColor: colors.primary,
            marginBottom: 10,
          }}>
          <Text>Edit Profile</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => navigate(EDIT_ACCOUNT)}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            padding: 10,
            borderRadius: 5,
            backgroundColor: colors.primary,
          }}>
          <Text>Edit Account</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ProfileComponent;
