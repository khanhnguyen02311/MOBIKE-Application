import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextInputOutline from '../common/textInputOutline-Kohana';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import colors from '../../assets/theme/colors';

const HeaderSearch = () => {
  return (
    <View
      style={{
        height: 70,
        flexDirection: 'row',
        backgroundColor: colors.secondary,
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 10,
      }}>
      <TextInputOutline
        label={'Search (by name)'}
        iconClass={Ionicons}
        iconName={'search-outline'}
        iconColor={'#90B4D3'}
        inputPadding={6}
        borderWidthtoTop={0}
        bigContainerStyle={{flex: 1, marginStart: 15, marginBottom: 0}}
        containerStyle={{height: 44, borderColor: '#305080'}}
        labelStyle={{fontSize: 12}}
        inputStyle={{fontSize: 14}}
        labelContainerStyle={{padding: 13}}
        iconSize={20}
      />
      <View style={{paddingBottom: 10, paddingHorizontal: 20}}>
        <SimpleLineIcon name="equalizer" size={24} color="#292D32" />
      </View>
    </View>
  );
};

export default HeaderSearch;
