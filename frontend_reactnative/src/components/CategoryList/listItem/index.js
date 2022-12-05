import {Gesture} from 'react-native-gesture-handler';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const ListItem = ({item, index}) => {
  const navigation = useNavigation();
  let path = item.url;
  return (
    <View style={styles.styleWrapper}>
      <TouchableOpacity>
        {/* // onPress={() =>
        //   navigation.navigate(PRODUCT_LIST, {title: title, index: index})
        // }> */}
        <View style={styles.imageWrapper}>
          <Image source={path} style={styles.styleImage} />
        </View>

        <Text style={styles.styleTitle}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  styleWrapper: {
    width: 65,
    paddingStart: 20,
    paddingEnd: 5,
    backgroundColor: 'transparent',
    marginHorizontal: 12,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  styleImage: {
    resizeMode: 'contain',
  },

  styleTitle: {
    width: 65,
    paddingTop: 5,
    fontSize: 12,
    fontWeight: 'semibold',
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#000',
  },

  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    padding: 5,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    elevation: 5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default ListItem;
