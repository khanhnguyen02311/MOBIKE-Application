import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import TextInputOutline from '../../../common/textInputOutline-Kohana';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  setMinMaxText,
  setPriceRange,
} from '../../../../redux/slice/filterSlice';
import {InterpolateFromPositionToValue} from '../../../../utils/interpolation';

const TextMinMax = ({Min, Max, step, sliderWidth, onUpdate}) => {
  const dispatch = useDispatch();
  const minMaxText = useSelector(state => state.filter.minMaxText);
  const priceRange = useSelector(state => state.filter.priceRange);
  //tmp = priceRange;

  const [min, setMin] = useState('$ ' + minMaxText.min);
  const [max, setMax] = useState('$ ' + minMaxText.max);

  useEffect(() => {
    setMin('$ ' + minMaxText.min);
    setMax('$ ' + minMaxText.max);
  }, [minMaxText]);
  const onEndEditing = (text, type) => {
    if (type === 'min') {
      minPosition = (sliderWidth * (text - Min)) / (Max - Min);
      dispatch(
        setPriceRange({
          min: text,
          max: priceRange.max,
          minPosition: minPosition,
          maxPosition: priceRange.maxPosition,
        }),
      );
      dispatch(setMinMaxText({min: text, max: minMaxText.max}));
    } else {
      maxPosition = (sliderWidth * (text - Min)) / (Max - Min);
      dispatch(
        setPriceRange({
          min: priceRange.min,
          max: text,
          minPosition: priceRange.minPosition,
          maxPosition: maxPosition,
        }),
      );
      dispatch(setMinMaxText({min: minMaxText.min, max: text}));
    }
  };

  return (
    <View>
      <TextInputOutline
        label={'Min'}
        iconClass={MaterialIcons}
        iconName={'drive-file-rename-outline'}
        iconColor={'#90B4D3'}
        inputPadding={6}
        borderWidthtoTop={0}
        bigContainerStyle={{flex: 1, marginStart: 15, marginBottom: 0}}
        containerStyle={{
          height: 44,
          borderColor: '#305080',
          marginStart: 5,
          marginEnd: 20,
          marginBottom: 10,
          marginTop: 30,
        }}
        labelStyle={{fontSize: 12}}
        inputStyle={{fontSize: 16}}
        labelContainerStyle={{padding: 13}}
        iconSize={20}
        value={min}
        onChangeText={text => setMin(text)}
        onEndEditing={text => onEndEditing(min.slice(2), 'min')}
      />
      <TextInputOutline
        label={'Max'}
        iconClass={MaterialIcons}
        iconName={'drive-file-rename-outline'}
        iconColor={'#90B4D3'}
        inputPadding={6}
        borderWidthtoTop={0}
        bigContainerStyle={{flex: 1, marginStart: 15, marginBottom: 0}}
        containerStyle={{
          height: 44,
          borderColor: '#305080',
          marginStart: 5,
          marginEnd: 20,
        }}
        labelStyle={{fontSize: 12}}
        inputStyle={{fontSize: 16}}
        labelContainerStyle={{padding: 13}}
        iconSize={20}
        value={max}
        onChangeText={text => setMax(text)}
        onEndEditing={text => onEndEditing(max.slice(2), 'max')}
      />
    </View>
  );
};

export default TextMinMax;
