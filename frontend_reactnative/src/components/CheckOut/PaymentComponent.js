import { View, Text, Image } from 'react-native'
import React from 'react'
import { RadioButton } from 'react-native-paper';
import colors from '../../assets/theme/colors';
import InsertBox from './InsertBox';

export default function PaymentComponent() {
    const [paymentMethod, setPaymentMethod] = React.useState(1);
    return (
        <View
            style={{
                padding: 15,
            }}
        >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000', marginTop: 5, marginBottom: 5 }}>
                Choose a payment method
            </Text>

            <Text style={{ fontSize: 15, fontWeight: '300', color: '#797A7C', marginBottom: 5 }}>
                You will not be charged until you review this order on the next page.
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: 50,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        width: '60%',
                        height: '100%',
                    }}
                >
                    <RadioButton
                        status={paymentMethod === 1 ? 'checked' : 'unchecked'}
                        onPress={() => setPaymentMethod(1)}
                    />
                    <Text
                        style={{
                            color: "#000",
                            fontSize: 14,
                            marginStart: 5,
                        }}>
                        Credit card
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row-reverse',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '40%',
                        height: '100%',
                        // backgroundColor: '#0F0',
                    }}
                >
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'contain',
                            marginRight: 5,
                            marginLeft: 15,
                        }}
                        source={require("../../assets/images/visa-logo.png")}
                    />
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'contain',
                        }}
                        source={require("../../assets/images/mastercard-logo.png")}
                    />
                </View>

            </View>

            {
                paymentMethod === 1 ?
                <View>
                    <InsertBox title="Name on card" label="Your name"/>
                    <InsertBox title="Card number" label="1111 2222 3333 4444"/>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        <View
                            style={{
                                width: '47%',
                            }}
                        >
                            <InsertBox title="Expiration date" label="MM/YY"/>
                        </View>
                        <View
                            style={{
                                width: '47%',
                            }}
                        >
                            <InsertBox title="Security code" label="cvc"/>
                        </View>

                    </View>
                </View>
                :
                null
            }

            <View
                style={{
                    flexDirection: 'row',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: 50,
                }}
            >
                <RadioButton
                    status={paymentMethod === 2 ? 'checked' : 'unchecked'}
                    onPress={() => setPaymentMethod(2)}
                />
                <Text
                    style={{
                        color: "#000",
                        fontSize: 14,
                        marginStart: 5,
                    }}>
                    Cash on delivery
                </Text>
            </View>

        </View>
    )
}