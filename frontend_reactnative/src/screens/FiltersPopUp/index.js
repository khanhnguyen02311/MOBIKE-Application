import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import FiltersPopUpComponent from '../../components/FiltersPopUp';
import Header from '../../components/common/header';

const FiltersPopUp = ({navigation}) => {
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {backgroundColor: '#EDF8FF', minHeight: 60, maxHeight: 80},
      });
  }, [navigation]);
  // navigation.setOptions({
  //   header: () => <Header title={'Filters'} textRight={'Reset'} />,
  // });

  return <FiltersPopUpComponent></FiltersPopUpComponent>;
};

export default FiltersPopUp;
