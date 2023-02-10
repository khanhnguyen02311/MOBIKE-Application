import { View, Text } from 'react-native'
import React from 'react'
import TextInputOutline from '../common/textInputOutline-Kohana'

export default function InsertBox(
    {
        title,
        label,
    }
) {
    return (
        <View
            style={{
                // padding: 5
            }}
        >
            <Text
                style={{
                    marginBottom: 5,
                    color: '#000'
                }}
            >
                {title}
            </Text>
            <TextInputOutline
                label={label}
                inputPadding={5}
                borderWidthtoTop={0}
                labelStyle={{fontSize: 14, fontWeight: '400'}}
                inputType=""
                onChangeText={() => { }}
            />
        </View>
    )
}