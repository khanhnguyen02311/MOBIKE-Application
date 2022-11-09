import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';

export const {width, height} = Dimensions.get('window');

const CarouselItem = ({item}) => {
  const {url} = item;
  return <Image source={url} style={styles.image} />;
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    // width: width,
    // height: height / 4,
    backgroundColor: 'white',
    // borderRadius: 10,
    // marginVertical: 10,
    //marginHorizontal: 25,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    //elevation: 8,
  },

  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },

  image: {
    width: width,
    //height: height / 5,
    //borderRadius: 10,
    resizeMode: 'cover',
  },

  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: 'black',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },

  itemDescription: {
    color: 'white',
    fontSize: 12,
    shadowColor: 'black',
    shadowOffset: {width: 0.8, height: 0.8},
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default CarouselItem;
