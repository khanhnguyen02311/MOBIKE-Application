import { View, Text } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../common/container';
import AuctionPreview from '../AuctionPreview';

const AuctionComponent = () => {
  return (
    <Container
      keyboardShouldPersistTaps="always"
      styleScrollView={{ backgroundColor: '#FFFFFF' }}>
      <View style={styles.container}>
        <AuctionPreview />
        <AuctionPreview />
        <AuctionPreview />
      </View>
    </Container>
  );
};

export default AuctionComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
});