import React from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import AuctionComponent from '../../components/Auction';
import AuctionDetailComponent from '../../components/AuctionDetail';
import PostDetailComponent from '../../components/PostDetail';
import store from '../../redux/store';

const AuctionDetail = ({ navigation }) => {
  useEffect(() => {
    navigation
      .getParent()
      .getParent()
      ?.setOptions({
        tabBarStyle: {
          display: 'none',
        },
      });
    return () =>
      navigation
        .getParent()
        .getParent()
        ?.setOptions({
          tabBarStyle: {
            backgroundColor: '#EDF8FF',
            minHeight: 56,
            maxHeight: 80,
          },
        });
  }, [navigation]);

  const selectedPost = store.getState().selectedPost;

  return (
    <AuctionDetailComponent postID={1}/>
  );
};

export default AuctionDetail;
