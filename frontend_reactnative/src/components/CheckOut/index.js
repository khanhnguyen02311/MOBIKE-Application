import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Header from './../common/header/index';
import { Dimensions } from 'react-native';
import colors from '../../assets/theme/colors';
import TabButton from './TabButton';
import PaymentComponent from './PaymentComponent';
import ReviewComponent from './ReviewComponent';
import ShippingComponent from './ShippingComponent';
import Container from './../common/container/index';
import { useNavigation } from '@react-navigation/native';
import { MARKETPLACE } from './../../constants/routeNames';
import InfoBox from './InfoBox';

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

export default function CheckOutComponent() {
    const [Tab, setTab] = React.useState(1);

    const { navigate } = useNavigation();

    const OnContinue = () => {
        if (Tab < 3) {
            setTab(prevTab => prevTab + 1);
        } else {
            navigate(MARKETPLACE)
        }
    }

    return (
        <View style={{ height: '100%' }}>

            <View
                style={{
                    height: heightScreen / 12,
                    flexDirection: 'row',
                    backgroundColor: '#F9F9F9',
                    borderBottomWidth: 1,
                    borderBottomColor: '#E5E5E5',
                }}
            >
                <TabButton
                    isActivated={Tab < 2}
                    number="1"
                    title="Shipping"
                    width={widthScreen / 3}
                    height={heightScreen / 12}
                    onPress={() => {
                        setTab(1);
                    }}
                />
                <TabButton
                    isActivated={Tab == 2}
                    number="2"
                    title="Payment"
                    width={widthScreen / 3}
                    height={heightScreen / 12}
                    onPress={() => {
                        setTab(2);
                    }}
                />
                <TabButton
                    isActivated={Tab > 2}
                    number="3"
                    title="Review"
                    width={widthScreen / 3}
                    height={heightScreen / 12}
                    onPress={() => {
                        setTab(3);
                    }}
                />
            </View>

            <Container
                keyboardShouldPersistTaps="always"
                styleScrollView={{ backgroundColor: '#FFFFFF' }}>
                {
                    Tab < 2 ? <ShippingComponent /> : Tab > 2 ? <ReviewComponent /> : <PaymentComponent />
                }
            </Container>

            <View
                style={{
                    height: heightScreen / 12 + (Tab > 2 ? 170 : 0),
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTopWidth: 1,
                    borderTopColor: '#E5E5E5',
                    backgroundColor: '#FFFFFF',
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                }}
            >
                {
                    Tab > 2 ?
                        <InfoBox
                            title="Order Summary"
                            canEdit={false}
                            backgroundColor="#F9F9F9"
                            borderColor="transparent"
                            content={[
                                { name: 'Subtotal', value: '$ 500.80' },
                                { name: 'Delivery', value: '$ 80.90' },
                            ]}
                            finalContent={{ name: 'Total', value: '$ 581.70' }}
                        />
                        : null
                }

                <TouchableWithoutFeedback
                    onPress={() => {
                        OnContinue();
                    }}
                >
                    <View
                        style={{
                            backgroundColor: colors.secondary,
                            width: '75%',
                            height: 40,
                            borderRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >

                        <Text
                            style={{
                                color: '#3B8AD3',
                                fontWeight: 'bold',
                            }}
                        >
                            {
                                Tab < 3 ? 'Continue' : 'Submit Order'
                            }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    )
}