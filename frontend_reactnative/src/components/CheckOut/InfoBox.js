import { View, Text } from 'react-native'
import React from 'react'

export default function InfoBox(
    {
        title,
        canEdit,
        content,
        backgroundColor,
        borderColor,
        specialName,
        finalContent,
    }
) {
    specialName = specialName ? specialName : [];
    return (
        <View
            style={{
                flexDirection: 'column',
                width: '100%',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: borderColor ? borderColor : '#EFEFEF',
                marginTop: 10,
                padding: 10,
                backgroundColor: backgroundColor ? backgroundColor : 'transparent',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Text style={{ fontSize: 15, color: '#000', marginBottom: 15 }}>
                    {title}
                </Text>

                {
                    canEdit && <Text style={{ fontSize: 15, color: '#3B8AD3', marginBottom: 15 }}> Edit </Text>
                }

            </View>

            {
                content.map((item, index) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        {
                            specialName[index] ?
                                specialName[index] :
                                <Text style={{ fontSize: 15, color: '#959496', marginBottom: 10 }}>
                                    {item.name}
                                </Text>

                        }

                        <Text style={{ fontSize: 15, color: '#575757', marginBottom: 10, width: 200, textAlign: 'right' }}>
                            {item.value}
                        </Text>

                    </View>
                ))
            }

            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >

                {finalContent ?
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                    >
                        <Text style={{ fontSize: 15, color: '#000', marginBottom: 10 }}>
                            {finalContent.name}
                        </Text>
                        <Text style={{ fontSize: 15, color: '#000', marginBottom: 10, width: 200, textAlign: 'right' }}>
                            {finalContent.value}
                        </Text>
                    </View>
                    :
                    null
                }


            </View>

        </View>
    )
}