import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableWithoutFeedback} from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import {FILTERS_POP_UP, LOADING, MARKETPLACE} from '../constants/routeNames';
import FiltersPopUp from '../screens/FiltersPopUp';
import Loading from '../screens/Loading';
import Marketplace from '../screens/Marketplace';

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
        name={FILTERS_POP_UP}
        component={FiltersPopUp}
        options={{
          header: () => <Header title={'Filters'} textRight={'Reset'} />,
        }}
      />
    </Stack.Navigator>
  );
};

export default MarketplaceNavigator;
