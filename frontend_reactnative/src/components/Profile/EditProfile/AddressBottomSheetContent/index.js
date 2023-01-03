import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../../../assets/theme/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../../common/container';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {FadeInDown, FadeInUp, Layout} from 'react-native-reanimated';

const heightScreen = Dimensions.get('window').height;

const AddressBottomSheetContent = ({
  data,
  onCloseBottomSheet,
  onSetAddress,
  initialAddress,
}) => {
  const [form, setForm] = useState(
    (initialAddress.City !== '' && initialAddress) || {
      City: 'Choose city',
      District: '',
      Ward: '',
    },
  );
  const [selected, setSelected] = useState('City');
  const [currentData, setCurrentData] = useState(data);
  const onSelect = name => {
    setSelected(name);
    if (name === 'City') {
      setCurrentData(data);
    } else if (name === 'District') {
      setCurrentData(data.filter(item => item.name === form.City)[0].value);
    } else if (name === 'Ward') {
      setCurrentData(
        data
          .filter(item => item.name === form.City)[0]
          .value.filter(item => item.name === form.District)[0].value,
      );
    }
  };
  const onChooseLocation = (name, value) => {
    if (name === 'City') {
      setSelected('District');
      setForm({...form, City: value, District: 'Choose district', Ward: ''});
      setCurrentData(currentData.filter(item => item.name === value)[0].value);
      return;
    } else if (name === 'District') {
      setSelected('Ward');
      setForm({...form, District: value, Ward: 'Choose Ward'});
      setCurrentData(currentData.filter(item => item.name === value)[0].value);
      return;
    }
    setForm({...form, [name]: value});
  };

  useEffect(() => {
    if (
      selected === 'Ward' &&
      form.Ward !== 'Choose Ward' &&
      form.Ward !== ''
    ) {
      onSetAddress(form);
      onCloseBottomSheet();
    }
  }, [form.Ward]);

  const _renderContent = (data, selected) => {
    return data.map((item, index) => {
      let flag = false;
      let firstLetter = '';
      if (
        (selected === 'City' && item.name === form.City) ||
        (selected === 'District' && item.name === form.District) ||
        (selected === 'Ward' && item.name === form.Ward)
      )
        flag = true;
      if (index === 0) firstLetter = item.name[0].toUpperCase();
      else if (item.name[0] !== data[index - 1].name[0])
        firstLetter = item.name[0].toUpperCase();
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => onChooseLocation(selected, item.name)}>
          <View
            style={{
              paddingBottom: index === data.length - 1 ? 315 : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 12,
              }}>
              <View style={{width: 25}}>
                {firstLetter && (
                  <Text style={{color: colors.grey}}>{firstLetter}</Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text style={{color: flag ? colors.primary : 'black'}}>
                  {item.name}
                </Text>

                {flag && (
                  <MaterialIcons
                    name="check"
                    size={16}
                    color={colors.primary}
                    style={{paddingTop: 3}}
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
  return (
    <View style={{backgroundColor: '#fff', height: '100%'}}>
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
            }}>
            <Text style={styles.resetLabel}>Reset</Text>
          </TouchableWithoutFeedback>
        </View>
        <Animated.View layout={Layout.stiffness(100).damping(10).duration(300)}>
          {Object.keys(form).map((key, index) => {
            if (form[key] !== '')
              return (
                <Animated.View
                  key={index}
                  layout={Layout.springify()}
                  entering={FadeInUp}>
                  <TouchableWithoutFeedback onPress={() => onSelect(key)}>
                    <View style={styles.selectedSectionItem}>
                      <View style={{alignItems: 'center'}}>
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
                            style={{paddingTop: 3}}
                          />
                        ) : (
                          <MaterialIcons
                            name="circle"
                            size={16}
                            color={'#cfcfcf'}
                            style={{paddingTop: 3}}
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
      <Animated.View
        layout={Layout.stiffness(100).damping(10).duration(300)}
        style={styles.selectedSectionContent}>
        <Text style={styles.selectedLabel}>{selected}</Text>
        <ScrollView>{_renderContent(currentData, selected)}</ScrollView>
      </Animated.View>
    </View>
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
