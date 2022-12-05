import {View, Text} from 'react-native';
import React from 'react';
import Container from '../common/container';
import FilterProp from './FilterProp';
const FiltersPopUpComponent = () => {
  return (
    <Container styleScrollView={{backgroundColor: 'white'}}>
      <FilterProp />
      <FilterProp />
      <FilterProp />
      <FilterProp />
      <FilterProp />
      <FilterProp />
      <FilterProp />
      <FilterProp/>
      <View style={{marginTop: 50}}></View>
    </Container>
  );
};

export default FiltersPopUpComponent;
