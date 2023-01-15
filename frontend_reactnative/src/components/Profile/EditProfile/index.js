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
import React, {useRef, useState, useEffect} from 'react';
import Container from '../../common/container';
import TextInputOutline from '../../common/textInputOutline-Kohana';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import AddressBottomSheetContent from './AddressBottomSheetContent';
import Store from '../../../redux/store';
import { getPersonalInfo } from '../../../backendAPI';
import AddPost from './../../../screens/AddPost/index';
import { useSelector } from 'react-redux';


const heightScreen = Dimensions.get('window').height;
const EditProfileComponent = () => {
  const addressTree = Store.getState().locations.Tree

  //set up form
  const [locationData, setLocationData] = useState({
    AddressTree: undefined,
    Locations: undefined,
  })

  const [personalInfoData, setPersonalInfoData] = useState({
    Birthdate: undefined,
    Gender: undefined,
    Identification_number: undefined,
    Name: undefined,
    Phone_number: undefined,
    Addresses: {}
  })

  const [form, setForm] = useState({
    name: '',
    phone_number: '',
    identification_number: '',
    birthday: '',
    IDAddress: {
      City: undefined,
      District: undefined,
      Ward: undefined,
    },
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

  useEffect(() => {
    const Locations = Store.getState().locations;
    console.log("Hello")
    setLocationData({
      AddressTree: Locations.Tree,
      Locations: {
        City: Locations.City,
        District: Locations.District,
        Ward: Locations.Ward,
      },
    })
    setPersonalInfoData(Store.getState().personalInfo)
    setForm({
      ...form,
      birthday: personalInfoData.Birthdate || '',

    }
    )
  }, [])

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

  const cityNameFromID = (ID) => {
    return locationData.Locations.Cities.find(city => city.ID === ID).Name
  }

  const districtNameFromID = (ID) => {
    return locationData.Locations.Districts.find(district => district.ID === ID).Name
  }

  const wardNameFromID = (ID) => {
    return locationData.Locations.Wards.find(ward => ward.ID === ID).Name
  }

  const setAddress = (cityID, districtID, wardID) => {
    setForm({...form, IDAddress: {
      City: cityID,
      District: districtID,
      Ward: wardID,
    }, address: {
      City: cityNameFromID(cityID),
      District: districtNameFromID(districtID),
      Ward: wardNameFromID(wardID),
    }});
  }

  const _renderContent = () => {
    return (
      <AddressBottomSheetContent
        data={Store.getState().locations.Tree}
        onCloseBottomSheet={() => changeBottomSheetVisibility(false)}
        onSetAddress={value => {
          setAddress(value.City, value.District, value.Ward);
        }}
        initialAddress={form.address}
      />
    );
  }

  const setName = (value) => {

  }

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
