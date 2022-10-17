import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Kohana} from 'react-native-textinput-effects';
import Container from '../../components/common/container';
import TextInputOutline from '../../components/common/textInputOutline-Kohana';
import {useSelector} from 'react-redux';
import HeaderSearch from '../../components/HeaderSearch';
import colors from '../../assets/theme/colors';

const Marketplace = ({navigation}) => {
  navigation.setOptions({
    header: () => <HeaderSearch />,
  });

  return (
    <Container
      keyboardShouldPersistTaps="always"
      styleContainer={{backgroundColor: '#FFFFFF'}}></Container>
  );
};

export default Marketplace;
