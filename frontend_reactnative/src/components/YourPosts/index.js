import {View, Text, TouchableWithoutFeedback} from 'react-native';
import React from 'react';
import colors from '../../assets/theme/colors';
import {ADD_POST} from '../../constants/routeNames';
import {useNavigation} from '@react-navigation/native';

const YourPostsComponent = () => {
  const {navigate} = useNavigation();
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigate(ADD_POST);
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            padding: 10,
            borderRadius: 5,
            backgroundColor: colors.primary,
          }}>
          <Text style={{color: colors.white}}>Add post</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default YourPostsComponent;
