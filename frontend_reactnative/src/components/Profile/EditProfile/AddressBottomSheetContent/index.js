import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '../../../../assets/theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../../common/container';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated';
import TextInputOutline from '../../../common/textInputOutline-Kohana';
import { FAB } from 'react-native-paper';
import { Keyboard } from 'react-native';

const heightScreen = Dimensions.get('window').height;

const AddressBottomSheetContent = ({
  data,
  onCloseBottomSheet,
  onSetAddress,
  initialAddress,
}) => {
  const [addressTree, setAddressTree] = useState([]);
  const [form, setForm] = useState(
    (initialAddress.City !== '' && initialAddress) || {
      City: 'Choose city',
      District: '',
      Ward: '',
    },
  );
  const [IDForm, setIDForm] = useState({
    City: undefined,
    District: undefined,
    Ward: undefined,
  });
  const [selected, setSelected] = useState('City');
  const [currentData, setCurrentData] = useState(data);

  const onSelect = name => {
    setSelected(name);
    if (name === 'City') {
      setCurrentData(data);
    } else if (name === 'District') {
      setCurrentData(data.filter(item => item.Name === form.City)[0].Districts);
    } else if (name === 'Ward') {
      setCurrentData(
        data
          .filter(item => item.Name === form.City)[0]
          .Districts.filter(item => item.Name === form.District)[0].Wards,
      );
    }
    setShowDetailAddress(false);
  };
  const onChooseLocation = (name, ID, value) => {
    if (name === 'City') {
      setSelected('District');
      setIDForm({ ...IDForm, City: ID, District: undefined, Ward: undefined });
      setForm({ ...form, City: value, District: 'Choose district', Ward: '' });
      setCurrentData(currentData.filter(item => item.Name === value)[0].Districts);
      return;
    } else if (name === 'District') {
      setSelected('Ward');
      setIDForm({ ...IDForm, District: ID, Ward: undefined });
      setForm({ ...form, District: value, Ward: 'Choose Ward' });
      setCurrentData(currentData.filter(item => item.Name === value)[0].Wards);
      return;
    }
    setIDForm({ ...IDForm, [name]: ID })
    setForm({ ...form, [name]: value });
    setShowDetailAddress(true);
    setSelected('');
  };

  useEffect(() => {
    if (
      selected === 'Ward' &&
      form.Ward !== 'Choose Ward' &&
      form.Ward !== ''
    ) {
      //onSetAddress(IDForm);
      // onCloseBottomSheet();
      setShowDetailAddress(true);
      setSelected('');
    }
  }, [form.Ward]);

  const _renderContent = (data, selected) => {
    return data.map((item, index) => {
      let flag = false;
      let firstLetter = '';
      if (
        (selected === 'City' && item.Name === form.City) ||
        (selected === 'District' && item.Name === form.District) ||
        (selected === 'Ward' && item.Name === form.Ward)
      )
        flag = true;
      if (index === 0) firstLetter = item.Name[0].toUpperCase();
      else if (item.Name[0] !== data[index - 1].Name[0])
        firstLetter = item.Name[0].toUpperCase();
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => onChooseLocation(selected, item.ID, item.Name)}>
          <View
            style={{
              paddingBottom: index === data.length - 1 ? 315 : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 12,
              }}>
              <View style={{ width: 25 }}>
                {firstLetter && (
                  <Text style={{ color: colors.grey }}>{firstLetter}</Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text style={{ color: flag ? colors.primary : 'black' }}>
                  {item.Name}
                </Text>

                {flag && (
                  <MaterialIcons
                    name="check"
                    size={16}
                    color={colors.primary}
                    style={{ paddingTop: 3 }}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#e9e9e9',
                marginStart: 35,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  const [showDetailAddress, setShowDetailAddress] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ backgroundColor: '#fff', height: '100%' }}>
        <Animated.View layout={Layout.stiffness(100).damping(10).duration(300)}>
          <View style={styles.selectedSectionLabel}>
            <Text style={styles.selectedLabel}>Selected area</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                setForm({
                  City: 'Choose city',
                  District: '',
                  Ward: '',
                });
                setCurrentData(data);
                setSelected('City');
                setShowDetailAddress(false);
              }}>
              <Text style={styles.resetLabel}>Reset</Text>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View layout={Layout.stiffness(100).damping(10).duration(300)}>
            {Object.keys(form).map((key, index) => {
              if (form[key] !== '' && key !== 'DetailAddress')
                return (
                  <Animated.View
                    key={index}
                    layout={Layout.springify()}
                    entering={FadeInUp}>
                    <TouchableWithoutFeedback onPress={() => onSelect(key)}>
                      <View style={styles.selectedSectionItem}>
                        <View style={{ alignItems: 'center' }}>
                          {key !== 'City' && (
                            <View
                              style={[
                                {
                                  width: 1,
                                  height: 24,
                                  backgroundColor: '#cfcfcf',
                                  marginTop: 3,
                                },
                              ]}
                            />
                          )}
                          {selected === key ? (
                            <MaterialCommunityIcons
                              name="circle-slice-8"
                              size={16}
                              color={colors.primary}
                              style={{ paddingTop: 3 }}
                            />
                          ) : (
                            <MaterialIcons
                              name="circle"
                              size={16}
                              color={'#cfcfcf'}
                              style={{ paddingTop: 3 }}
                            />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.selectedSectionItemText,
                            selected === key && {
                              color: colors.primary,
                              fontWeight: 'bold',
                            },
                          ]}>
                          {form[key]}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </Animated.View>
                );
            })}
          </Animated.View>
        </Animated.View>

        {!showDetailAddress && <Animated.View
          layout={Layout.stiffness(100).damping(10).duration(300)}
          style={styles.selectedSectionContent}>
          <Text style={styles.selectedLabel}>{selected}</Text>
          <ScrollView>{_renderContent(currentData, selected)}</ScrollView>
        </Animated.View>}
        
        {showDetailAddress && <Animated.View
          layout={Layout.stiffness(100).damping(10).duration(300)}
          style={styles.selectedSectionContent}>
          <Text style={[styles.selectedLabel, { marginBottom: 10, marginTop: 15 }]}>Detail Address</Text>
          <TextInputOutline
            label={'Detail address (optional)'}
            iconClass={MaterialCommunityIcons}
            iconName={'map-marker-outline'}
            iconColor={'#90B4D3'}
            inputPadding={6}
            borderWidthtoTop={0}
            containerStyle={{
              height: 44,
              borderColor: '#555',
            }}
            bigContainerStyle={{ marginHorizontal: 20 }}
            labelStyle={{ fontSize: 12 }}
            inputStyle={{ fontSize: 16 }}
            labelContainerStyle={{ padding: 13 }}
            iconSize={20}
            value={form.DetailAddress}
            onChangeText={value => {
              setForm({
                ...form,
                DetailAddress: value,
              });
            }}
          />
        </Animated.View>}

        {showDetailAddress &&
          <FAB
            onPress={() => {
              console.log(form);
              onSetAddress(form);
              onCloseBottomSheet();
            }}
            label='Done'
            variant='extended'
            size='small'
            style={{
              position: 'absolute',
              margin: 16,
              marginHorizontal: 20,
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: colors.secondary,
            }} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddressBottomSheetContent;

const styles = StyleSheet.create({
  selectedSectionLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedLabel: {
    marginStart: 15,
    color: colors.black,
    fontWeight: 'bold',
  },
  resetLabel: {
    marginEnd: 15,
    color: colors.primary,
    fontWeight: 'bold',
  },
  selectedSectionContent: {
    marginTop: 15,
  },

  selectedSectionItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginStart: 25,
  },
  selectedSectionItemText: {
    marginStart: 10,
    color: '#000',
    alignSelf: 'flex-end',
  },
});
