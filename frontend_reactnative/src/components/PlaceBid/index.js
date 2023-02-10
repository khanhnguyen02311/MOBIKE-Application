import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Container from '../common/container'
import { StyleSheet } from 'react-native'
import { Image } from 'react-native'
import colors from '../../assets/theme/colors'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TextInputOutline from '../common/textInputOutline-Kohana'
import MobikeImage from '../common/image';

const PlaceBidComponent = () => {

    const ratingPost = [
        {
            ID: 1,
            Rating_point: 5,
            Content:
                'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 1,
            User_Info: {
                ID: 1,
                ID_Avatar: 1,
                Name: 'Dang Khoa Nguyen',
            },
            Bid: '$4,500.90'
        },
        {
            ID: 2,
            Rating_point: 4,
            Content: 'Nice bike, good !!!',
            Time_created: '21:30 - 09/01/2022',
            ID_Post: 1,
            ID_Account: 2,
            User_Info: {
                ID: 1,
                ID_Avatar: 2,
                Name: 'Khang Huynh',
            },
            Bid: '$4,400.20'
        },
        {
            ID: 3,
            Rating_point: 3,
            Content: 'Good cusomer service, I like it.',
            Time_created: '21:30 - 01/01/2022',
            ID_Post: 1,
            ID_Account: 3,
            User_Info: {
                ID: 1,
                ID_Avatar: 3,
                Name: 'Khanh Nguyen',
            },
            Bid: '$3,900.50'
        },
        {
            ID: 4,
            Rating_point: 1,
            Content:
                'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 4,
            User_Info: {
                ID: 4,
                ID_Avatar: 4,
                Name: 'Minj07',
            },
            Bid: '$3,300.80'
        },
        {
            ID: 5,
            Rating_point: 2,
            Content: 'Nice bike, good !!!',
            Time_created: '21:30 - 09/01/2022',
            ID_Post: 1,
            ID_Account: 5,
            User_Info: {
                ID: 5,
                ID_Avatar: 5,
                Name: 'Abcdavid',
            },
            Bid: '$3,000.10'
        },
        {
            ID: 6,
            Rating_point: 3,
            Content: 'Good cusomer service, I like it.',
            Time_created: '21:30 - 01/01/2022',
            ID_Post: 1,
            ID_Account: 6,
            User_Info: {
                ID: 6,
                ID_Avatar: 6,
                Name: 'Khanh Nguyen',
            },
            Bid: '$2,500.90'
        },
        {
            ID: 1,
            Rating_point: 5,
            Content:
                'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 1,
            User_Info: {
                ID: 1,
                ID_Avatar: 1,
                Name: 'Dang Khoa Nguyen',
            },
            Bid: '$4,500.90'
        },
        {
            ID: 2,
            Rating_point: 4,
            Content: 'Nice bike, good !!!',
            Time_created: '21:30 - 09/01/2022',
            ID_Post: 1,
            ID_Account: 2,
            User_Info: {
                ID: 1,
                ID_Avatar: 2,
                Name: 'Khang Huynh',
            },
            Bid: '$4,400.20'
        },
        {
            ID: 3,
            Rating_point: 3,
            Content: 'Good cusomer service, I like it.',
            Time_created: '21:30 - 01/01/2022',
            ID_Post: 1,
            ID_Account: 3,
            User_Info: {
                ID: 1,
                ID_Avatar: 3,
                Name: 'Khanh Nguyen',
            },
            Bid: '$3,900.50'
        },
        {
            ID: 4,
            Rating_point: 1,
            Content:
                'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 4,
            User_Info: {
                ID: 4,
                ID_Avatar: 4,
                Name: 'Minj07',
            },
            Bid: '$3,300.80'
        },
        {
            ID: 5,
            Rating_point: 2,
            Content: 'Nice bike, good !!!',
            Time_created: '21:30 - 09/01/2022',
            ID_Post: 1,
            ID_Account: 5,
            User_Info: {
                ID: 5,
                ID_Avatar: 5,
                Name: 'Abcdavid',
            },
            Bid: '$3,000.10'
        },
        {
            ID: 6,
            Rating_point: 3,
            Content: 'Good cusomer service, I like it.',
            Time_created: '21:30 - 01/01/2022',
            ID_Post: 1,
            ID_Account: 6,
            User_Info: {
                ID: 6,
                ID_Avatar: 6,
                Name: 'Khanh Nguyen',
            },
            Bid: '$2,500.90'
        },
    ];

    const _renderBid = () => {
        let shorttenRatingPost = ratingPost.slice(0, 3);
        return (
            <View>
                {shorttenRatingPost.map((item, index) => (
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

                        <View
                            style={{ height: 1, backgroundColor: '#E8E8E8', marginTop: 10 }}
                        />
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={{ height: '100%', position: 'relative' }}>
            <Container
                keyboardShouldPersistTaps="always"
                styleScrollView={{
                    backgroundColor: '#FFFFFF',
                }}>

                {/* Auction info */}
                <View style={styles.auctionInfoContainer}>

                    <View style={styles.imageWrapper}>
                        <Image source={require('../../assets/images/Honda.webp')} style={styles.imageVehicle} />
                    </View>

                    <View style={styles.infoWrapper}>
                        <Text style={styles.textTitle}>Honda CB200X Adventure Launched in India | KTM 790</Text>
                        <Text style={styles.textType_Brand}>Scooter - Honda</Text>
                        <Text style={styles.textCre}>Posted by Huynh Duy Khang</Text>
                    </View>

                </View>
                <View style={styles.textInfoWrapper}>
                    <Text style={styles.textInfo}>You must bid at least $4,600</Text>
                    <FontAwesome5 name="fire" size={14} color="#FA3E3E" />
                </View>

                <TextInputOutline
                    label={'Place your bid'}
                    iconClass={MaterialIcons}
                    iconName={'attach-money'}
                    iconColor={'#90B4D3'}
                    inputPadding={6}
                    borderWidthtoTop={0}
                    bigContainerStyle={{ marginHorizontal: '5%', marginBottom: 0 }}
                    containerStyle={{ height: 44, borderColor: '#555' }}
                    labelStyle={{ fontSize: 12 }}
                    inputStyle={{ fontSize: 14 }}
                    labelContainerStyle={{ padding: 13 }}
                    iconSize={20}
                />

                <Text style={styles.textLastestBid}>
                    Lastest Bids
                </Text>

                <_renderBid />

                <View style={{ height: 200 }}></View>
            </Container>
        </View>
    )
}


export default PlaceBidComponent

const styles = StyleSheet.create({
    auctionInfoContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: '5%',
    },
    imageWrapper: {
        elevation: 10,
        borderRadius: 10,
    },
    imageVehicle: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    infoWrapper: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    textTitle: {
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
    },
    textType_Brand: {
        fontSize: 12,
        color: '#000000',
        fontWeight: '300',
        fontStyle: 'italic',
        marginBottom: 10,
    },
    textCre: {
        fontSize: 14,
        color: colors.text,
        fontWeight: '500',
    },
    textInfoWrapper: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 30,
        alignItems: 'center',
        marginBottom: 15,
    },
    textInfo: {
        fontSize: 14,
        color: '#555555',
        fontWeight: '500',
        marginRight: 5,
    },
    textLastestBid: {
        fontSize: 14,
        color: '#8D8D8D',
        fontWeight: '500',
        marginHorizontal: '5%',
        marginTop: 30,
        marginBottom: 5,
    }
})