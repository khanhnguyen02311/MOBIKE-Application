import {View, Text, Image} from 'react-native';
import React from 'react';

const LoadingComponent = () => {
  return (
    <View>
      <Image
        resizeMode="stretch"
        style={{width: '100%', height: '100%'}}
        source={require('../../assets/images/loading.png')}
      />
      <Text style={{position: 'absolute', alignSelf: 'center', top: 70}}>
        On the wayyyyy
      </Text>
      <Image
        source={require('../../assets/images/loading-wheel.gif')}
        style={{position: 'absolute'}}
      />
    </View>
  );
};

export default LoadingComponent;
