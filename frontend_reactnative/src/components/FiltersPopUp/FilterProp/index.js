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

UIManager.setLayoutAnimationEnabledExperimental(true);
const FilterProp = () => {
  const [show, setShow] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const durationLayout = 300;
  const toggle = () => {
    setShow(prevState => !prevState);
    
    Animated.timing(rotateAnim, {
      toValue: show ? 0 : 1,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Animated.View
      layout={Layout.stiffness(100).damping(10).duration(durationLayout)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 20,
          paddingBottom: 15,
          alignItems: 'center',
        }}>
        <Animated.Text
          layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
          style={{
            marginStart: 25,
            color: 'black',
            fontSize: 15,
            fontStyle: 'italic',
            fontWeight: '700',
          }}>
          Name
        </Animated.Text>
        <TouchableWithoutFeedback onPress={toggle}>
          <Animated.View
            layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
            style={{marginEnd: 25, transform: [{rotateZ: rotate}]}}>
            <SimpleLineIcon name="arrow-down" size={15} color={'black'} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      {show && (
        <Animated.View
          entering={SlideInLeft.duration(300).delay(150)}
          layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
          style={{marginStart: 5, marginEnd: 20}}>
          <TextInputOutline
            label={'Honda Wave...'}
            iconClass={MaterialIcons}
            iconName={'drive-file-rename-outline'}
            iconColor={'#90B4D3'}
            inputPadding={6}
            borderWidthtoTop={0}
            bigContainerStyle={{flex: 1, marginStart: 15, marginBottom: 0}}
            containerStyle={{height: 44, borderColor: '#305080'}}
            labelStyle={{fontSize: 12}}
            inputStyle={{fontSize: 16}}
            labelContainerStyle={{padding: 13}}
            iconSize={20}
          />
        </Animated.View>
      )}
      <Animated.View
        layout={Layout.stiffness(100).damping(10).duration(durationLayout)}
        style={{
          backgroundColor: '#A9A9A9',
          height: 1,
          marginStart: 25,
          marginTop: show ? 10 : 5,
        }}
      />
    </Animated.View>
  );
};

export default FilterProp;
