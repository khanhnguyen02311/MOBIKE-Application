import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React from 'react'
import Header from './../common/header/index';
import { Dimensions, Image } from 'react-native';
import colors from '../../assets/theme/colors';
import TabButton from './../MyOrders/TabButton';
import Container from './../common/container/index';
import { useNavigation } from '@react-navigation/native';
import { MARKETPLACE } from './../../constants/routeNames';
import ProductList from './../../screens/ProductList/index';
import MyOrders from './../../screens/MyOrders/index';
import { color } from 'react-native-reanimated';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const MyBidsComponent = () => {
    const { navigate } = useNavigation();
    const [tab, setTab] = React.useState(1);

    const UpcomingBid = (index) => (
        <View
            key={index}
            style={{
                height: 180,
                width: '100%',
                backgroundColor: '#FFF',
                marginBottom: 15,
                borderRadius: 10,
                flexDirection: 'column',
            }}
        >
            <View
                style={{
                    height: '70%',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                }}
            >

                <Image
                    style={{ height: 100, width: 100, borderRadius: 5 }}
                    source={require('../../assets/images/motor.png')}
                />

                <View
                    style={{
                        height: '100%',
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: 10,
                    }}
                >
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', width: 230 }}>
                        Honda CB200X Adventure Touner Launched in India | KTM Duke 790
                    </Text>

                    <Text style={{ fontSize: 13, fontWeight: '200', color: '#555555', width: 230 }}>
                        Scooter - Honda
                    </Text>

                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#8D8D8D', width: 230, textAlign: 'right' }}>
                        <Text>Ends in: </Text>
                        <Text style={{ color: colors.primary }}>2h 40m 27s</Text>
                    </Text>

                </View>

            </View>

            <View style={{ width: '100%', height: 1, backgroundColor: '#E8E8E8' }} />

            <View
                style={{
                    height: '30%',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.dollar}>
                        <Text style={styles.textDollar}>$</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'flex-start',
                            marginLeft: 5,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                            }}
                        >
                            Current bid
                        </Text>
                        <Text style={{ color: index == 0 ? "#65F662" : "#BC2424", fontWeight: 'bold' }}>4,500.90</Text>
                    </View>

                </View>
                <View
                    style={{
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: colors.secondary,
                        width: 150,
                        borderRadius: 10,
                        paddingHorizontal: 15,
                    }}
                >
                    <Text
                        style={{
                            color: "#3B8AD3",
                        }}
                    >
                        Place a bid
                    </Text>
                </View>
            </View>

        </View>
    )

    const PastBid = (index) => (
        <View
            key={index}
            style={{
                height: 120,
                width: '100%',
                backgroundColor: '#FFF',
                marginBottom: 15,
                borderRadius: 10,
            }}
        >
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                }}
            >

                <Image
                    style={{ height: 100, width: 100, borderRadius: 5, marginTop: 5 }}
                    source={require('../../assets/images/motor.png')}
                />

                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: 10,
                    }}
                >
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', width: 230 }}>
                        Honda CB200X Adventure Touner Launched in India | KTM Duke 790
                    </Text>

                    <Text style={{ fontSize: 13, fontWeight: '200', color: '#555555', width: 230 }}>
                        Scooter - Honda
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                        <View style={styles.dollar}>
                            <Text style={styles.textDollar}>$</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'column',
                                justifyContent: 'space-around',
                                alignItems: 'flex-start',
                                marginLeft: 5,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 10,
                                }}
                            >
                                Current bid
                            </Text>
                            <Text style={{ color: "#BC2424", fontWeight: 'bold' }}>4,500.90</Text>
                        </View>

                    </View>

                </View>

            </View>

        </View>
    )

    const WinningBid = (index) => (
        <View
            key={index}
            style={{
                height: 180,
                width: '100%',
                backgroundColor: '#FFF',
                marginBottom: 15,
                borderRadius: 10,
                flexDirection: 'column',
            }}
        >
            <View
                style={{
                    height: '70%',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                }}
            >

                <Image
                    style={{ height: 100, width: 100, borderRadius: 5 }}
                    source={require('../../assets/images/motor.png')}
                />

                <View
                    style={{
                        height: '100%',
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: 10,
                    }}
                >
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', width: 230 }}>
                        Honda CB200X Adventure Touner Launched in India | KTM Duke 790
                    </Text>

                    <Text style={{ fontSize: 13, fontWeight: '200', color: '#555555', width: 230 }}>
                        Scooter - Honda
                    </Text>

                    <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#8D8D8D', width: 230, textAlign: 'right' }}>
                        <Text>Ends in: </Text>
                        <Text style={{ color: colors.primary }}>3d 2h 40m 27s</Text>
                    </Text>

                </View>

            </View>

            <View style={{ width: '100%', height: 1, backgroundColor: '#E8E8E8' }} />

            <View
                style={{
                    height: '30%',
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 10,
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.dollar}>
                        <Text style={styles.textDollar}>$</Text>
                    </View>

                    <View
                        style={{
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'flex-start',
                            marginLeft: 5,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 10,
                            }}
                        >
                            Current bid
                        </Text>
                        <Text style={{ color: "#65F662", fontWeight: 'bold' }}>4,500.90</Text>
                    </View>

                </View>
                <View
                    style={{
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "#A8FDBB",
                        width: 150,
                        borderRadius: 10,
                        paddingHorizontal: 15,
                    }}
                >
                    <Text
                        style={{
                            color: "#23D05E",
                        }}
                    >
                        Buy now
                    </Text>
                </View>
            </View>

        </View>
    )

    return (
        <View style={{ height: '100%' }}>

            <View
                style={{
                    height: heightScreen / 18,
                    flexDirection: 'row',
                    backgroundColor: '#F9F9F9',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E5E5',
                }}
            >
                <TabButton
                    isActivated={tab < 2}
                    title="Upcoming"
                    width={widthScreen / 3}
                    height='100%'
                    onPress={() => {
                        setTab(1);
                    }}
                />
                <TabButton
                    isActivated={tab == 2}
                    title="Past"
                    width={widthScreen / 3}
                    height='100%'
                    onPress={() => {
                        setTab(2);
                    }}
                />
                <TabButton
                    isActivated={tab == 3}
                    title="Winning"
                    width={widthScreen / 3}
                    height='100%'
                    onPress={() => {
                        setTab(3);
                    }}
                />

            </View>

            <Container
                keyboardShouldPersistTaps="always"
                styleScrollView={{ backgroundColor: '#F6F6F6' }}>

                <View
                    style={{
                        padding: 15,
                        flexDirection: 'column',
                    }}
                >

                    {
                        Array.from({ length: 10 }, (_, i) => i + 1).map((item, index) => (
                            tab < 2 ? UpcomingBid(index) : tab == 2 ? PastBid(index) : WinningBid(index)
                        ))
                    }

                </View>

            </Container>

        </View>
    )
}

export default MyBidsComponent

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
        top: 10,
        right: 14,
        backgroundColor: '#00000055',
        borderRadius: 10,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    textEndTime: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 3,
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