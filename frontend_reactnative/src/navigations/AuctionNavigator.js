import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableWithoutFeedback } from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import {
  AUCTION,
  AUCTION_DETAIL_NAVIGATOR,
  EDIT_ACCOUNT,
  EDIT_PTOFILE,
  PROFILE,
} from '../constants/routeNames';
import Auction from '../screens/Auction';
import EditAccount from '../screens/EditAccount';
import EditProfile from '../screens/EditProfile';
import Profile from '../screens/Profile';
import AuctionDetailNavigator from './AuctionDetailNavigator';

const Stack = createNativeStackNavigator();

const AuctionNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AUCTION}>
      <Stack.Screen
        name={AUCTION}
        component={Auction}
        options={{ header: () => <HeaderSearch /> }}
      />

      <Stack.Screen
        name={AUCTION_DETAIL_NAVIGATOR}
        component={AuctionDetailNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuctionNavigator;
