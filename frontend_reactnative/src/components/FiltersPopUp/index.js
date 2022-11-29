import {View, Text} from 'react-native';
import React from 'react';
import Container from '../common/container';
import FilterProp from './FilterProp';
const FiltersPopUpComponent = () => {
  return (
    <Container styleScrollView={{backgroundColor: 'white'}}>
      <FilterProp />
    </Container>
  );
};

export default FiltersPopUpComponent;
