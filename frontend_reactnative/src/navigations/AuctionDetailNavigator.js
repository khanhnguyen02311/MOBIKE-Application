import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableWithoutFeedback } from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import {
  ADD_POST,
  AUCTION_DETAIL,
  FILTERS_POP_UP,
  LOADING,
  POST_DETAIL,
  POST_PREVIEW,
  SEE_ALL_BID,
  SEE_ALL_REVIEWS,
  YOUR_POSTS,
} from '../constants/routeNames';
import AuctionDetail from '../screens/AuctionDetail';
import PostDetail from '../screens/PostDetail';
import SeeAllBid from '../screens/SeeAllBid';
import SeeAllReviews from '../screens/SeeAllReviews';

const Stack = createNativeStackNavigator();

const AuctionDetailNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={AUCTION_DETAIL}>
      <Stack.Screen
        name={AUCTION_DETAIL}
        component={AuctionDetail}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'Auction Detail'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={SEE_ALL_BID}
        component={SeeAllBid}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'History'}
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

export default AuctionDetailNavigator;
