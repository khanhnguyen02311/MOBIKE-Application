import { View, Text } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Container from '../common/container';
import AuctionPreview from '../AuctionPreview';
import ReviewPreview from '../ReviewPreview';

const ReviewComponent = () => {
    return (
        <Container
            keyboardShouldPersistTaps="always"
            styleScrollView={{ backgroundColor: '#FFFFFF' }}>
            <View style={styles.container}>
                <ReviewPreview />
                <ReviewPreview />
                <ReviewPreview />
            </View>
        </Container>
    )
}

export default ReviewComponent

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    }
});