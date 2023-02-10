import { View, Text } from 'react-native'
import React from 'react'
import { withDecay } from 'react-native-reanimated'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

export default function TabButton({
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
                    borderColor: '#3B8AD3',
                    borderBottomWidth: isActivated ? 1 : 0,
                }}
            >
                <Text
                    style={{
                        color: isActivated ? '#3B8AD3' : '#000',
                    }}
                >
                    {title}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}