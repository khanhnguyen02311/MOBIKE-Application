import {
  View,
  Text,
  TouchableWithoutFeedback,
  Easing,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp,
  Layout,
  SlideInLeft,
  SlideInRight,
  ZoomInLeft,
} from 'react-native-reanimated';
import React, {useEffect, useRef, useState} from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CategoryList from '../../CategoryList/flatList';
import dataCategoryList from '../../../data/dataCategoryList';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RangeSlider from '../../common/rangeSlider';
import {useDispatch, useSelector} from 'react-redux';
import {
  setMinMaxText,
  setName,
  setPriceRange,
} from '../../../redux/slice/filterSlice';
import FilterPropFrame from '../FilterPropFrame';
import TextMinMax from './TextMinMax';

UIManager.setLayoutAnimationEnabledExperimental(true);
const FilterPropPriceRange = ({min, max, step, sliderWidth}) => {
  //Toogle show/hide filter options
  const [show, setShow] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShow(prevState => !prevState);
    dispatch(setPriceRange(tmp));
  };

  //Prepare data for filter
  const priceRange = useSelector(state => state.filter.priceRange);
  const dispatch = useDispatch();
  tmp = priceRange;

  return (
    <FilterPropFrame type={'Price Range'} onToggle={onToggle} show={show}>
      {show && (
        <Animated.View
          entering={FadeInUp.duration(300).delay(100)}
          layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
          <GestureHandlerRootView>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <RangeSlider
                sliderWidth={sliderWidth}
                min={min}
                max={max}
                minPosition={priceRange.minPosition}
                maxPosition={priceRange.maxPosition}
                step={step}
                onValueChange={range => {
                  tmp = range;
                  dispatch(setMinMaxText({min: range.min, max: range.max}));
                }}
              />
              <TextMinMax
                Min={min}
                Max={max}
                step={step}
                sliderWidth={sliderWidth}
              />
            </View>
          </GestureHandlerRootView>
        </Animated.View>
      )}
    </FilterPropFrame>
  );
};

export default FilterPropPriceRange;
