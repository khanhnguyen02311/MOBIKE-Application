import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Kohana} from 'react-native-textinput-effects';
import Container from '../../components/common/container';
import TextInputOutline from '../../components/common/textInputOutline-Kohana';
import {useSelector} from 'react-redux';

const Marketplace = () => {
  const date = useSelector(state => state.auth.date);

  return (
    <Container
      keyboardShouldPersistTaps="always"
      styleContainer={{backgroundColor: '#FFFFFF'}}>
      {/* <Text>{date.date}/{date.month}/{date.year}</Text> */}
    </Container>
  );
};

export default Marketplace;
