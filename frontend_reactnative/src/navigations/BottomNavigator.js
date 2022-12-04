import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MARKETPLACE,
  MARKETPLACE_NAVIGATOR,
  NOTIFICATIONS,
  PROFILE,
  YOUR_POSTS,
} from '../constants/routeNames';
import Marketplace from '../screens/Marketplace';
import Notifications from '../screens/Notifications';
import YourPosts from '../screens/YourPosts';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderSearch from '../components/HeaderSearch';
import MarketplaceNavigator from './MarketplaceNavigator';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === MARKETPLACE_NAVIGATOR) {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === YOUR_POSTS) {
            iconName = focused ? 'browsers' : 'browsers-outline';
          } else if (route.name === NOTIFICATIONS) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === PROFILE) {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarItemStyle: {marginBottom: 7},
        tabBarIconStyle: {marginBottom: -7},
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: '#EDF8FF', minHeight: 60, maxHeight: 80},
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}>
      <Tab.Screen
        name={MARKETPLACE_NAVIGATOR}
        component={MarketplaceNavigator}
        options={{tabBarLabel: 'Marketplace'}}
      />
      <Tab.Screen
        name={YOUR_POSTS}
        component={YourPosts}
        options={{title: 'Your posts'}}
      />
      <Tab.Screen
        name={NOTIFICATIONS}
        component={Notifications}
        options={{title: 'Notifications'}}
      />
      <Tab.Screen
        name={PROFILE}
        component={Profile}
        options={{title: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
