import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../common/container';
import FilterProp from './FilterPropName';
import FilterPropName from './FilterPropName';
import {useDispatch} from 'react-redux';
import {
  setInitial,
  setMinMaxText,
  setPriceRange,
} from '../../redux/slice/filterSlice';
import FilterPropVehicleTypes from './FilterPropVehicleTypes';
import FilterPropPriceRange from './FilterPropPriceRange';
import data from '../../data/dataCategoryList';
const FiltersPopUpComponent = () => {
  const min = 0;
  const max = 300;
  const sliderWidth = 300;
  const step = 10;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitial());
    dispatch(
      setPriceRange({
        min: min,
        max: max,
        minPosition: 0,
        maxPosition: sliderWidth,
      }),
      dispatch(setMinMaxText({min: min, max: max})),
    );
  }, []);
  return (
    <Container styleScrollView={{backgroundColor: 'white'}}>
      <FilterPropName />
      <FilterPropVehicleTypes data={data} />
      <FilterPropPriceRange
        min={min}
        max={max}
        sliderWidth={sliderWidth}
        step={step}
      />
      <View style={{marginTop: 100}}></View>
    </Container>
  );
};

export default FiltersPopUpComponent;
