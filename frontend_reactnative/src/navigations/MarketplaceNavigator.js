import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FiltersPopUpComponent from '../components/FiltersPopUp';
import HeaderSearch from '../components/HeaderSearch';
import {FILTERS_POP_UP, LOADING, MARKETPLACE} from '../constants/routeNames';
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
      <Stack.Screen name={FILTERS_POP_UP} component={FiltersPopUpComponent} />
    </Stack.Navigator>
  );
};

export default MarketplaceNavigator;
