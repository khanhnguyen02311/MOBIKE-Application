import { View, Text } from 'react-native'
import React from 'react'
import TextInputOutline from '../common/textInputOutline-Kohana'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InsertBox from './InsertBox';
import Container from '../common/container';

export default function ReviewComponent() {
    return (

                <View
                    style={{
                        padding: 15,
                    }}
                >
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000', marginTop: 5, marginBottom: 5 }}>
                        Enter your contact information
                    </Text>

                    <InsertBox title="Phone number" label="111-222-333" />
                    <InsertBox title="Email" label="Your email (example@gmail.com)" />

                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#000', marginTop: 5, marginBottom: 5 }}>
                        Shipping address
                    </Text>

                    <InsertBox title="Name" label="Your name" />
                    <InsertBox title="Country" label="Select country" />
                    <InsertBox title="Address" label="Select area" />
                    <InsertBox title="Apartment" label="12 (Optional)" />
                    <InsertBox title="Zip Code" label="10001 (Optional)" />

                </View>


    )
}