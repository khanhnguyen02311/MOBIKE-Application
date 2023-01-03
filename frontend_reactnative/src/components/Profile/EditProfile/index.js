import {Gesture} from 'react-native-gesture-handler';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Container from '../../common/container';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import AddressBottomSheetContent from './AddressBottomSheetContent';
import dataAddress from '../../../data/dataAddress';

const heightScreen = Dimensions.get('window').height;
const EditProfileComponent = () => {
  const [form, setForm] = useState({
    birthday: '',
    address: {
      City: '',
      District: '',
      Ward: '',
    },
  });
  const [errors, setErrors] = useState();
  onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  //set up date picker
  const [show, setShow] = useState(false);
  const onDateChange = (event, selectedDate) => {
    let currentDate;
    if (selectedDate) {
      currentDate =
        selectedDate.getDate() +
        '/' +
        (selectedDate.getMonth() + 1) +
        '/' +
        selectedDate.getFullYear();
    } else {
      currentDate = form.birthday;
    }
    setShow(false);
    setForm({...form, birthday: currentDate});
  };
  const showDatePicker = () => {
    setShow(true);
    console.log('show date picker');
  };

  //set up address picker
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const changeBottomSheetVisibility = visibility => {
    bottomSheet.current.snapTo(visibility ? 0 : 1);
    setBottomSheetVisible(visibility);
  };

  const bottomSheet = useRef(null);
  const fall = new Animated.Value(1);
  const _renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  const _renderContent = () => (
    <AddressBottomSheetContent
      data={dataAddress}
      onCloseBottomSheet={() => changeBottomSheetVisibility(false)}
      onSetAddress={value => {
        setForm({...form, address: value});
      }}
      initialAddress={form.address}
    />
  );

  return (
    <Container
      keyboardShouldPersistTaps={'never'}
      styleScrollView={{backgroundColor: '#fff'}}
      styleWrapper={{height: heightScreen}}>
      <Animated.View
        style={{
          paddingHorizontal: 20,
          marginTop: 20,
          flex: 1,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}>
        <TextInputOutline
          label={'Name'}
          iconClass={MaterialIcons}
          iconName={'drive-file-rename-outline'}
          iconColor={'#90B4D3'}
          inputPadding={5}
          borderWidthtoTop={0}
          onChangeText={value => {
            onChange({name: 'name', value});
          }}
        />
        <TextInputOutline
          label={'Phone Number'}
          iconClass={Ionicons}
          iconName={'call'}
          iconColor={'#90B4D3'}
          inputPadding={5}
          borderWidthtoTop={0}
          onChangeText={value => {
            onChange({name: 'phone number', value});
          }}
        />
        <TextInputOutline
          label={'Identification Number'}
          iconClass={MaterialCommunityIcons}
          iconName={'identifier'}
          iconColor={'#90B4D3'}
          inputPadding={5}
          borderWidthtoTop={0}
          onChangeText={value => {
            onChange({name: 'identification number', value});
          }}
        />
        <TextInputOutline
          label={'Birthday'}
          iconClass={MaterialIcons}
          iconName={'date-range'}
          iconColor={'#90B4D3'}
          inputPadding={5}
          borderWidthtoTop={0}
          onTouchStart={showDatePicker}
          editable={!show}
          value={form.birthday}
        />
        <TextInputOutline
          label={'Address'}
          iconClass={MaterialCommunityIcons}
          iconName={'map-marker-outline'}
          iconColor={'#90B4D3'}
          inputPadding={5}
          borderWidthtoTop={0}
          onTouchStart={() => {
            changeBottomSheetVisibility(true);
          }}
          editable={!isBottomSheetVisible}
          value={
            form.address.City === ''
              ? ''
              : form.address.Ward +
                ', ' +
                form.address.District +
                ', ' +
                form.address.City
          }
        />
        {show && (
          <DateTimePicker
            testID="datetimePicker"
            value={
              form.birthday !== ''
                ? new Date(
                    form.birthday.split('/')[2],
                    parseInt(form.birthday.split('/')[1]) - 1,
                    form.birthday.split('/')[0],
                  )
                : new Date(Date.now())
            }
            mode={'date'}
            display="default"
            onChange={onDateChange}
          />
        )}
      </Animated.View>

      <BottomSheet
        ref={bottomSheet}
        snapPoints={[heightScreen - 15, 0]}
        initialSnap={1}
        callbackNode={fall}
        onCloseEnd={() => {
          changeBottomSheetVisibility(false);
        }}
        enabledGestureInteraction={true}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
      />
    </Container>
  );
};

export default EditProfileComponent;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#ddd',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});
