import {
  View,
  Text,
  TouchableWithoutFeedback,
  Easing,
  LayoutAnimation,
  UIManager,
  Platform,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import CategoryList from '../../CategoryList/flatList';
import dataCategoryList from '../../../data/dataCategoryList';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RangeSlider from '../../common/rangeSlider';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setPriceRange } from '../../../redux/slice/filterSlice';
import FilterPropFrameComponent from '../FilterPropFrame';
import { FILTERS_POP_UP_MANUFACTURER } from '../../../constants/routeNames';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInDown, FadeInUp, Layout, SlideInLeft } from 'react-native-reanimated';
import colors from '../../../assets/theme/colors';

UIManager.setLayoutAnimationEnabledExperimental(true);
const FilterPropManufacturerComponent = () => {

  //Toogle show/hide filter options
  const [show, setShow] = useState(false);
  const durationLayout = 300;
  const onToggle = () => {
    setShow(prevState => !prevState);
  };
  const { navigate } = useNavigation();
  const onNavigate = () => {
    navigate(FILTERS_POP_UP_MANUFACTURER);
  };

  //Prepare data for filter

  return (
    <FilterPropFrameComponent
      type={'Manufacturer'}
      animate={true}
      show={show}
      onToggle={onToggle}>
      <Animated.View
        entering={FadeInUp.duration(300).delay(100)}
        layout={Layout.stiffness(100)
          .damping(10)
          .duration(durationLayout)}>
        <TouchableWithoutFeedback onPress={onNavigate}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontStyle: 'italic', color: colors.primary, marginBottom: 5 }}>Choose from list ></Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </FilterPropFrameComponent>
  );
};

export default FilterPropManufacturerComponent;
