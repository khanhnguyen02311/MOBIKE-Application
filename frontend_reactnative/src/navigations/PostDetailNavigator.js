import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableWithoutFeedback } from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import {
  ADD_POST,
  FILTERS_POP_UP,
  LOADING,
  POST_DETAIL,
  POST_PREVIEW,
  SEE_ALL_REVIEWS,
  YOUR_POSTS,
  CHECKOUT
} from '../constants/routeNames';
import PostDetail from '../screens/PostDetail';
import SeeAllReviews from '../screens/SeeAllReviews';
import CheckOut from '../screens/CheckOut';


const Stack = createNativeStackNavigator();

const PostDetailNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={POST_DETAIL}>
      <Stack.Screen
        name={POST_DETAIL}
        component={PostDetail}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'Post Detail'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={SEE_ALL_REVIEWS}
        component={SeeAllReviews}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'Reviews'}
              onLeftClick={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
      <Stack.Screen
        name={CHECKOUT}
        component={CheckOut}
        options={{
          header: ({ navigation }) => (
            <Header
              title={'Checkout'}
              onLeftClick={() => {
                navigation.goBack();
              }}
              textLeft={'Cancel'}
              styleTextLeft={{ color: "#818181" }}
            />
          )
        }}
      />
    </Stack.Navigator>
  );
};

export default PostDetailNavigator;
