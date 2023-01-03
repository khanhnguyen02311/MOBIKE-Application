import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../common/container';
import FilterPropNameComponent from './FilterPropName';
import {useDispatch} from 'react-redux';
import {
  setInitial,
  setMinMaxText,
  setPriceRange,
} from '../../redux/slice/filterSlice';
import FilterPropVehicleTypesComponent from './FilterPropVehicleTypes';
import FilterPropPriceRangeComponent from './FilterPropPriceRange';
import data from '../../data/dataCategoryList';
import FilterPropManufacturerComponent from './FilterPropManufacturer';
const FiltersPopUpComponent = () => {
  const min = 10;
  const max = 1000;
  const sliderWidth = 300;
  const step = 1;
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
    );
    dispatch(setMinMaxText({min: min, max: max}));
  }, []);
  return (
    <Container styleScrollView={{backgroundColor: 'white'}}>
      <FilterPropNameComponent />
      <FilterPropVehicleTypesComponent data={data} />
      <FilterPropPriceRangeComponent
        min={min}
        max={max}
        sliderWidth={sliderWidth}
        step={step}
      />
      <FilterPropManufacturerComponent />
      <View style={{marginTop: 100}}></View>
    </Container>
  );
};

export default FiltersPopUpComponent;
