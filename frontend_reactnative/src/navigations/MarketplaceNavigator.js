import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableWithoutFeedback } from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import { FILTERS_POP_UP_NAVIGATOR, MARKETPLACE, POST_DETAIL } from '../constants/routeNames';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Marketplace from '../screens/Marketplace';
import PostDetail from '../screens/PostDetail';
import FiltersPopUpNavigator from './FiltersPopUpNavigator';
import colors from '../assets/theme/colors';

const Stack = createNativeStackNavigator();

const MarketplaceNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={MARKETPLACE}>
      <Stack.Screen
        name={MARKETPLACE}
        component={Marketplace}
        options={{ header: () => <HeaderSearch /> }}
      />
      <Stack.Screen
        name={FILTERS_POP_UP_NAVIGATOR}
        component={FiltersPopUpNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={POST_DETAIL}
        component={PostDetail}
        options={{
          header: ({ navigation }) => <Header
            title={'Post Detail'}
            iconRight={'heart-outline'}
            onLeftClick={() => {
              navigation.goBack();
            }}
          />
        }}
      />
    </Stack.Navigator>
  );
};

export default MarketplaceNavigator;
