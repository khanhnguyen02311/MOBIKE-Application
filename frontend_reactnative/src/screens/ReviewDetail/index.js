import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import ReviewDetailComponent from '../../components/ReviewDetail'

const ReviewDetail = ({ navigation }) => {
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
    return (
        <ReviewDetailComponent postID={1} />
    )
}

export default ReviewDetail