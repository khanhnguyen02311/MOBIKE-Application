import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableWithoutFeedback} from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import {FILTERS_POP_UP_NAVIGATOR, MARKETPLACE} from '../constants/routeNames';
import Marketplace from '../screens/Marketplace';
import FiltersPopUpNavigator from './FiltersPopUpNavigator';

const Stack = createNativeStackNavigator();

const MarketplaceNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={MARKETPLACE}>
      <Stack.Screen
        name={MARKETPLACE}
        component={Marketplace}
        options={{header: () => <HeaderSearch />}}
      />
      <Stack.Screen
        name={FILTERS_POP_UP_NAVIGATOR}
        component={FiltersPopUpNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MarketplaceNavigator;
