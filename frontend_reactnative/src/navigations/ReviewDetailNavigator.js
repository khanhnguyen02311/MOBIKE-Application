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
  PLACE_BID,
  POST_DETAIL,
  POST_PREVIEW,
  REVIEW_DETAIL,
  SEE_ALL_BID,
  SEE_ALL_COMMENT,
  SEE_ALL_REVIEWS,
  YOUR_POSTS,
} from '../constants/routeNames';
import AuctionDetail from '../screens/AuctionDetail';
import PlaceBid from '../screens/PlaceBid';
import PostDetail from '../screens/PostDetail';
import ReviewDetail from '../screens/ReviewDetail';
import SeeAllBid from '../screens/SeeAllBid';
import SeeAllComment from '../screens/SeeAllComment';
import SeeAllReviews from '../screens/SeeAllReviews';

const Stack = createNativeStackNavigator();

const ReviewDetailNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={REVIEW_DETAIL}>
      <Stack.Screen
        name={REVIEW_DETAIL}
        component={ReviewDetail}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'Review Detail'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={SEE_ALL_COMMENT}
        component={SeeAllComment}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'Comments'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={PLACE_BID}
        component={PlaceBid}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'Place a Bid'}
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

export default ReviewDetailNavigator;
