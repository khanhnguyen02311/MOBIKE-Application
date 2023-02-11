import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../assets/theme/colors'
import { useNavigation } from '@react-navigation/native'
import { AUCTION_DETAIL_NAVIGATOR, REVIEW_DETAIL_NAVIGATOR } from '../../constants/routeNames'
import Octicons from 'react-native-vector-icons/Octicons'

const ReviewPreview = () => {

    const postInfo = {
        title: 'Honda CB200X Adventure Launched in India | KTM Duke 790',
        type: 'Scooter',
        brand: 'Honda',
        current_bid: '4,500.90',
        time: '13:21',
        user_name: 'Huynh Duy Khang'
    }

    const { navigate } = useNavigation();

    const onPress = () => {
        navigate(REVIEW_DETAIL_NAVIGATOR);
    }

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View>
                    <Image source={require('../../assets/images/Honda.webp')} style={styles.image} />

                    <View style={styles.endTimeWrapper}>
                        <Text style={styles.textEndTime}>{postInfo.time}</Text>
                    </View>

                    <View style={styles.sellerInfoWrapper}>
                        <Image source={require('../../assets/images/avatar.jpg')} style={styles.avatar} />
                        <Text style={styles.textUserName}>{postInfo.user_name}</Text>
                    </View>

                </View>

                <View style={styles.vehicleInfoWrapper}>
                    <Text style={styles.textTitle}>{postInfo.title}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.textTypeBrand}>{postInfo.type + ' - ' + postInfo.brand}</Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginRight: 5,
                                }}>
                                <Octicons name="star-fill" size={14} color={'#FCC72E'} />
                                <Text
                                    style={{
                                        color: '#000',
                                        fontSize: 12,
                                        marginLeft: 5,
                                        fontWeight: '500',
                                    }}>
                                    4.7
                                </Text>
                            </View>
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 10,
                                    fontWeight: '300',
                                    fontStyle: 'italic',
                                }}>
                                / 120 Reviews
                            </Text>
                        </View>
                    </View>
                </View>



                {/* <View style={styles.seperate} />

            <View style={styles.button_bidWrapper}>

                <View style={styles.dollar_bidWrapper}>
                    <View style={styles.dollar}>
                        <Text style={styles.textDollar}>$</Text>
                    </View>

                    <View style={styles.bidWrapper}>
                        <Text style={styles.textCurrentBid}>Current bid</Text>
                        <Text style={styles.textBid}>{postInfo.current_bid}</Text>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={onPressPlaceBid}>
                    <View style={styles.button_bid}>
                        <Text style={styles.textButtonBid}>Place a Bid</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View> */}

            </View>
        </TouchableWithoutFeedback>
    )
}

export default ReviewPreview

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        width: '86%',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        elevation: 10,
    },
    image: {
        width: '100%',
        height: 155,
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    endTimeWrapper: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 10,
        right: 14,
        backgroundColor: '#00000055',
        borderRadius: 5,
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 3,
    },
    textEndTime: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '400',
    },
    sellerInfoWrapper: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: -15,
        left: 15,
        backgroundColor: '#FFF',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        elevation: 3,
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 100,
        resizeMode: 'cover',
    },
    textUserName: {
        color: '#707072',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    vehicleInfoWrapper: {
        padding: 15,
        marginTop: 7,
        paddingBottom: 0,
        marginBottom: 15,
    },
    textTitle: {
        color: '#000000',
        fontSize: 17,
        fontWeight: 'bold',
    },
    textTypeBrand: {
        marginTop: 5,
        color: '#000',
        fontSize: 13,
        fontStyle: 'italic',
        fontWeight: '300',
    },
    seperate: {
        height: 1,
        width: '100%',
        backgroundColor: '#EDEDED',
        marginTop: 10,
    },
    button_bidWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,

        marginBottom: 10,
    },
    dollar_bidWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    dollar: {
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        height: 26,
        width: 26,
        elevation: 3,
    },
    textDollar: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
    bidWrapper: {
        marginLeft: 8,
        justifyContent: 'center',
    },
    textCurrentBid: {
        color: '#C6C6C6',
        fontSize: 10,
        fontWeight: 'bold',
    },
    textBid: {
        color: '#BC2424',
        fontSize: 14,
        fontWeight: 'bold',
    },
    button_bid: {
        backgroundColor: colors.secondary,
        width: 160,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    textButtonBid: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '600',
    },
})