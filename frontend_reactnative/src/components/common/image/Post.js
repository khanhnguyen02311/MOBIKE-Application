import {View, Text} from 'react-native';
import React from 'react';
import {Image} from 'react-native';

export default function PostImage({ID, style}) {
  let path = require('../../../assets/images/S1.jpg');
  switch ((ID % 5) + 1) {
    case 1:
      path = require('../../../assets/images/S1.jpg');
      break;
    case 2:
      path = require('../../../assets/images/S2.jpg');
      break;
    case 3:
      path = require('../../../assets/images/S3.jpg');
      break;
    case 4:
      path = require('../../../assets/images/S4.jpg');
      break;
    case 5:
      path = require('../../../assets/images/S5.jpg');
      break;
  }
  return <Image source={path} style={[{resizeMode: 'cover'}, style]} />;
}
