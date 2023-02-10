import { View, Text } from 'react-native'
import React from 'react'
import { withDecay } from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default function TabButton({
    number,
    title,
    width,
    height,
    backgroundColor,
    isActivated,
    onPress,
}) {
    return (
        <TouchableWithoutFeedback
            onPress={onPress}
        >
            <View
                style={{
                    width: width,
                    height: height,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: backgroundColor || 'transparent',
                    opacity: isActivated ? 1 : 0.5,
                }}
            >
                <View
                    style={{
                        width: 22,
                        height: 22,
                        backgroundColor: '#000',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 10,
                    }}
                >
                    <Text
                        style={{
                            color: '#FFF',
                            fontSize: 12,
                        }}
                    >{number}</Text>
                </View>
                <Text
                    style={{
                        color: '#000',
                    }}
                >
                    {title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}