import {View, Text, TouchableWithoutFeedback, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
const FilterProp = () => {
  const [show, setShow] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const toggle = () => {
    setShow(prevState => !prevState);
    Animated.timing(rotateAnim, {
      toValue: show ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 20,
          alignItems: 'center',
        }}>
        <Text
          style={{
            marginStart: 25,
            color: 'black',
            fontSize: 15,
            fontStyle: 'italic',
            fontWeight: '700',
          }}>
          Name
        </Text>
        <TouchableWithoutFeedback onPress={toggle}>
          <Animated.View
            style={{marginEnd: 20, transform: [{rotateZ: rotate}]}}>
            <SimpleLineIcon name="arrow-down" size={15} color={'black'} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{backgroundColor: '#A9A9A9', height: 1, marginStart: 25}} />
    </View>
  );
};

export default FilterProp;
