import { Gesture } from 'react-native-gesture-handler';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native';
import { POST_DETAIL } from '../../../constants/routeNames';
import { useDispatch } from 'react-redux';
import { selectPost } from '../../../redux/slice/selectedPostSlice';

const ListItem = ({ item, index }) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const onNavigate = () => {
    navigate(POST_DETAIL);
    dispatch(selectPost({ ID: '1' }));
  };
  let path = item.url;
  return (
    <TouchableWithoutFeedback onPress={onNavigate}>
      <View
        style={[styles.styleWrapper, index === 0 ? { marginStart: 20 } : null]}>
        <Image source={path} style={styles.styleImage} />

        <View style={styles.textWrapper}>
          <Text
            style={styles.styleTitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text style={styles.styleInfo} numberOfLines={1} ellipsizeMode="tail">
            {item.info}
          </Text>
          <Text
            style={styles.stylePrice}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.price}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  styleWrapper: {
    backgroundColor: '#EDEDED',
    padding: 13,
    borderRadius: 5,
    marginEnd: 13,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  styleImage: {
    width: 120,
    height: 120,
  },

  textWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },

  styleTitle: {
    width: 115,
    paddingTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  styleInfo: {
    width: 115,
    paddingTop: 3,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#000000',
    fontStyle: 'italic',
  },
  stylePrice: {
    width: 115,
    paddingTop: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#BC2424',
  },
});

export default ListItem;
