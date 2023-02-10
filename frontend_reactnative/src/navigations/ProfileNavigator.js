import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableWithoutFeedback } from 'react-native';
import Header from '../components/common/header';
import { EDIT_ACCOUNT, EDIT_PTOFILE, MY_BIDS, MY_ORDERS, PROFILE } from '../constants/routeNames';
import EditAccount from '../screens/EditAccount';
import EditProfile from '../screens/EditProfile';
import MyBids from '../screens/MyBids';
import MyOrders from '../screens/MyOrders';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={PROFILE}>
      <Stack.Screen
        name={PROFILE}
        component={Profile}
        options={{ headerShown: false }}
      //options={{header: () => <HeaderSearch />}}
      />
      <Stack.Screen
        name={EDIT_PTOFILE}
        component={EditProfile}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'Edit Profile'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={MY_ORDERS}
        component={MyOrders}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'My Orders'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={MY_BIDS}
        component={MyBids}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'My Bids'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
