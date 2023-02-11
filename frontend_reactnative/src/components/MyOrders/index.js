import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Header from './../common/header/index';
import { Dimensions, Image } from 'react-native';
import colors from '../../assets/theme/colors';
import TabButton from './TabButton';
import Container from './../common/container/index';
import { useNavigation } from '@react-navigation/native';
import { MARKETPLACE } from './../../constants/routeNames';
import ProductList from './../../screens/ProductList/index';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;


const MyOrdersComponent = () => {
    const { navigate } = useNavigation();
    const [tab, setTab] = React.useState(1);



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
                    title="Current"
                    width={widthScreen / 4}
                    height='100%'
                    onPress={() => {
                        setTab(1);
                    }}
                />
                <TabButton
                    isActivated={tab == 2}
                    title="Pending"
                    width={widthScreen / 4}
                    height='100%'
                    onPress={() => {
                        setTab(2);
                    }}
                />
                <TabButton
                    isActivated={tab == 3}
                    title="History"
                    width={widthScreen / 4}
                    height='100%'
                    onPress={() => {
                        setTab(3);
                    }}
                />
                <TabButton
                    isActivated={tab > 3}
                    title="Cancel"
                    width={widthScreen / 4}
                    height='100%'
                    onPress={() => {
                        setTab(4);
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
                                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#000', width: 230}}>
                                            Honda CB200X Adventure Touner Launched in India | KTM Duke 790
                                        </Text>

                                        <Text style={{ fontSize: 13, fontWeight: '200', color: '#555555', width: 230}}>
                                            17:43 - 03/01/2023
                                        </Text>

                                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#BC2424', width: 230, textAlign: 'right'}}>
                                            $4,500.90
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
                                        <Image
                                            style={{ height: 30, width: 30, borderRadius: 100 }}
                                            source={require('../../assets/images/avatar.jpg')}
                                        />
                                        <Text style={{ fontSize: 16, marginLeft: 10 }}>Huynh Duy Khang</Text>
                                    </View>
                                    <View
                                        style={{
                                            height: 30,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: tab == 2 ? '#8D8D8D' : '#90B4D3',
                                            width: 150,
                                            borderRadius: 50,
                                            paddingHorizontal: 15,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#FFF',
                                            }}
                                        >
                                            { tab < 2 ? 'Received Product' : tab == 2 ? 'Cancel' : 'Reorder'}
                                        </Text>
                                    </View>
                                </View>

                            </View>
                        ))
                    }

                </View>

            </Container>

        </View>
    )
}

export default MyOrdersComponent