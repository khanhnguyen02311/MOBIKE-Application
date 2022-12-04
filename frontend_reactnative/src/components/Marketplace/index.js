import {View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import React from 'react';
import Container from '../common/container';
import colors from '../../assets/theme/colors';
import Carousel from '../Banner/carousel';
import imageBanner from '../../data/imageBanner';
import dataCategoryList from '../../data/dataCategoryList';
import dataPostPreviewList from '../../data/dataPostPreviewList';
import CategoryList from '../CategoryList/flatList';
import PostPreviewList from '../PostPreview/flatList';

const MarketplaceComponent = () => {
  return (
    <Container
      keyboardShouldPersistTaps="always"
      styleScrollView={{backgroundColor: '#FFFFFF'}}>
      <Carousel data={imageBanner} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              marginStart: 20,
              marginTop: 5,
              marginBottom: 7,
              color: '#000000',
            }}>
            Vehicle Types
          </Text>
          <CategoryList data={dataCategoryList} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000000',
              }}>
              Recommendation
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: colors.primary,
                fontStyle: 'italic',
              }}>
              See more >
            </Text>
          </View>
          <PostPreviewList data={dataPostPreviewList} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000000',
              }}>
              From Merchants
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: colors.primary,
                fontStyle: 'italic',
              }}>
              See more >
            </Text>
          </View>
          <PostPreviewList data={dataPostPreviewList} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 20,
              marginVertical: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000000',
              }}>
              Most Recently
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: colors.primary,
                fontStyle: 'italic',
              }}>
              See more >
            </Text>
          </View>
          <PostPreviewList data={dataPostPreviewList} />
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default MarketplaceComponent;
