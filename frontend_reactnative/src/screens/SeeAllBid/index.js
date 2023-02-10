import { View, Text } from 'react-native'
import React from 'react'
import SeeAllBidComponent from '../../components/SeeAllBid'

const SeeAllBid = ({ route }) => {
    const { ratingPost } = route.params;
    return (
        <SeeAllBidComponent ratingPost={ratingPost} />
    )
}

export default SeeAllBid