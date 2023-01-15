import { View, Text, Keyboard } from 'react-native'
import Container from '../../components/common/container'
import React from 'react'
import TextInputOutline from '../common/textInputOutline-Kohana'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const FilterPopUpManufacturerComponent = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ backgroundColor: '#FFF', height: '100%' }}>
        <TextInputOutline
          label={'Search manufacturer'}
          iconClass={Ionicons}
          iconName={'search-outline'}
          iconColor={'#90B4D3'}
          inputPadding={6}
          borderWidthtoTop={0}
          bigContainerStyle={{ flex: 1, marginHorizontal: 15, marginTop: 15 }}
          containerStyle={{ height: 44, borderColor: 'transparent' }}
          labelStyle={{ fontSize: 12 }}
          inputStyle={{ fontSize: 14 }}
          labelContainerStyle={{ padding: 13 }}
          iconSize={20}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default FilterPopUpManufacturerComponent