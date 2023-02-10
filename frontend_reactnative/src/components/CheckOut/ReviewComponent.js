import { View, Text } from 'react-native'
import React from 'react'
import colors from '../../assets/theme/colors'
import InfoBox from './InfoBox'
import { Image } from 'react-native'

export default function ReviewComponent() {
    return (
        <View
            style={{
                padding: 15,
                backgroundColor: '#FFFFFF',
            }}
        >
            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000', marginTop: 5, marginBottom: 5 }}>
                Please confirm and submit your order
            </Text>

            <Text style={{ fontSize: 13, fontWeight: '300', color: '#797A7C', marginBottom: 5 }}>
                <Text>By clicking submit order, you agree to MOBIKE's </Text>
                <Text style={{ textDecorationLine: 'underline' }} >Terms of Service</Text>
                <Text> and </Text>
                <Text style={{ textDecorationLine: 'underline' }} >Privacy Policy</Text>
            </Text>

            <InfoBox
                title="Payment"
                canEdit={true}
                content={[{ name: 'Payment method', value: '01/25' }]}
                specialName={[
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                resizeMode: 'contain',
                                marginRight: 10,
                            }}
                            source={require("../../assets/images/mastercard-logo.png")}
                        />
                        <Text style={{ fontSize: 15, color: '#959496', marginBottom: 10 }} >
                            .... 1234
                        </Text>
                    </View>
                ]}
            />

            <InfoBox
                title="Contact Information"
                canEdit={true}
                content={[
                    { name: 'Phone number', value: '0929377566' },
                    { name: 'Email', value: '2051433@gmail.uit.edu.vn' }
                ]}
            />

            <InfoBox
                title="Shipping Address"
                canEdit={true}
                content={[
                    { name: 'Name', value: 'Huynh Duy Khang' },
                    { name: 'Country', value: 'Viet Nam' },
                    { name: 'Address', value: '10/34, Thong Nhat Ward, Bien Hoa City, Dong Nai Province' },
                    { name: 'Apartment', value: '12' },
                    { name: 'Zip Code', value: '10001' },
                ]}
            />

        </View>
    )
}