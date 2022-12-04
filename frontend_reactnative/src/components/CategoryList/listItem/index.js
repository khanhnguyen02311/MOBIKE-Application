import {Gesture} from 'react-native-gesture-handler';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../assets/theme/colors';
import {useDispatch, useSelector} from 'react-redux';
import {
  setVehicleTypesAdd,
  setVehicleTypesRemove,
} from '../../../redux/slice/filterSlice';

const ListItem = ({item, index, type}) => {
  const navigation = useNavigation();
  let path = item.url;
  const vehicleTypes = useSelector(state => state.filter.vehicleTypes);

  const isInSelectdList = vehicleTypes.includes(item.id);
  const dispatch = useDispatch();

  const [isSelected, setIsSelected] = React.useState(isInSelectdList);
  const selectedColor = colors.secondary;

  const choose = type == 'choose';
  const onPress = choose
    ? () => {
        if (!isSelected) {
          dispatch(setVehicleTypesAdd(item.id));
        } else {
          dispatch(setVehicleTypesRemove(item.id));
        }
        setIsSelected(!isSelected);
      }
    : () => {
        // navigation.navigate(PRODUCT_LIST, {title: title, index: index});
      };

  return (
    <View style={styles.styleWrapper}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View>
          <View
            style={[
              styles.imageWrapper,
              choose && {
                backgroundColor: isSelected ? selectedColor : '#d9d9d9',
              },
            ]}>
            <Image source={path} style={styles.styleImage} />
          </View>

          <Text
            style={[
              styles.styleTitle,
              choose && {color: isSelected ? '#3B8AD3' : 'black'},
            ]}>
            {item.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  styleWrapper: {
    width: 65,
    paddingStart: 20,
    paddingEnd: 5,
    backgroundColor: 'transparent',
    marginHorizontal: 12,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  styleImage: {
    resizeMode: 'contain',
  },

  styleTitle: {
    width: 65,
    paddingTop: 5,
    fontSize: 12,
    fontWeight: 'semibold',
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#000',
  },

  imageWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    padding: 5,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default ListItem;
