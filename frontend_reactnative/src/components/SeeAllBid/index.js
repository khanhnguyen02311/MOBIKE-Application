import React from 'react';
import { useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../../assets/theme/colors';
import Container from '../common/container';
import Octicons from 'react-native-vector-icons/Octicons';
import MobikeImage from '../common/image';

const SeeAllBidComponent = ({ ratingPost }) => {

    // Render Rating List
    const renderRatingList = () => {
        return (
            <View>
                {ratingPost.map((item, index) => (
                    <View key={index}>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingTop: 10,
                                marginLeft: 10,
                                alignItems: 'center',
                            }}>
                            <MobikeImage.Avatar
                                ID={item.User_Info.ID_Avatar}
                                style={{ width: 40, height: 40, borderRadius: 500 }}
                            />
                            <View style={{ marginHorizontal: 15, flex: 1 }}>
                                {/* Name & Time Created & Bid */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                color: '#000',
                                                fontWeight: '500',
                                                fontSize: 12,
                                            }}>
                                            {item.User_Info.Name}
                                        </Text>
                                        <Text
                                            style={{
                                                color: '#555',
                                                fontWeight: '300',
                                                fontSize: 10,
                                                fontStyle: 'italic',
                                                marginTop: 5,
                                            }}>
                                            {item.Time_created}
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            color: index == 0 ? '#63F060' : '#8D8D8D',
                                            fontWeight: '500',
                                            fontSize: index == 0 ? 16 : 14,
                                            marginRight: 7,
                                        }}>
                                        {item.Bid}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Seperate */}
                        <View
                            style={{ height: 1, backgroundColor: '#E8E8E8', marginTop: 10 }}
                        />
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={{ height: '100%', backgroundColor: '#FFFFFF' }}>
            <Container
                keyboardShouldPersistTaps="always"
                styleScrollView={{
                    backgroundColor: '#FFFFFF',
                }}>
                {renderRatingList()}
            </Container>
        </View>
    );
};

export default SeeAllBidComponent;
