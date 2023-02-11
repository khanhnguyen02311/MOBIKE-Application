import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AUCTION_NAVIGATOR,
  MARKETPLACE,
  MARKETPLACE_NAVIGATOR,
  NOTIFICATIONS,
  PROFILE,
  PROFILE_NAVIGATOR,
  REVIEW_NAVIGATOR,
  YOU,
  YOUR_POSTS_NAVIGATOR,
} from '../constants/routeNames';
import Marketplace from '../screens/Marketplace';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import HeaderSearch from '../components/HeaderSearch';
import MarketplaceNavigator from './MarketplaceNavigator';
import YourPostsNavigator from './YourPostsNavigator';
import ProfileNavigator from './ProfileNavigator';
import AuctionNavigator from './AuctionNavigator';
import ReviewNavigator from './ReviewNavigator';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === MARKETPLACE_NAVIGATOR) {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === REVIEW_NAVIGATOR) {
            iconName = focused ? 'browsers-outline' : 'browsers-outline';
          } else if (route.name === AUCTION_NAVIGATOR) {
            iconName = focused ? 'hand-coin' : 'hand-coin-outline';
            return (
              <MaterialCommunityIcon
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === PROFILE_NAVIGATOR) {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#384653',
        tabBarInactiveTintColor: '#8D8D8D',
        tabBarItemStyle: { marginBottom: 10 },
        tabBarIconStyle: { marginBottom: -5 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#EDF8FF', height: 56 },
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: '#EDF8FF',
        tabBarInactiveBackgroundColor: '#EDF8FF',
        headerShown: false,
      })}>
      <Tab.Screen
        name={MARKETPLACE_NAVIGATOR}
        component={MarketplaceNavigator}
        options={{ tabBarLabel: 'Marketplace' }}
      />
      <Tab.Screen
        name={REVIEW_NAVIGATOR}
        component={ReviewNavigator}
        options={{ tabBarLabel: 'Review' }}
      />
      <Tab.Screen
        name={AUCTION_NAVIGATOR}
        component={AuctionNavigator}
        options={{ tabBarLabel: 'Auction' }}
      />
      <Tab.Screen
        name={PROFILE_NAVIGATOR}
        component={ProfileNavigator}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
