import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, TouchableWithoutFeedback} from 'react-native';
import Header from '../components/common/header';
import HeaderSearch from '../components/HeaderSearch';
import {
  ADD_POST,
  FILTERS_POP_UP,
  LOADING,
  YOUR_POSTS,
} from '../constants/routeNames';
import AddPost from '../screens/AddPost';
import FiltersPopUp from '../screens/FiltersPopUp';
import Loading from '../screens/Loading';
import Marketplace from '../screens/Marketplace';
import YourPosts from '../screens/YourPosts';

const Stack = createNativeStackNavigator();

const YourPostsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={YOUR_POSTS}>
      <Stack.Screen
        name={YOUR_POSTS}
        component={YourPosts}
        //options={{header: () => <HeaderSearch />}}
      />
      <Stack.Screen
        name={ADD_POST}
        component={AddPost}
        options={{
          header: ({navigation}) => (
            <Header
              title={'Add New Post'}
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

export default YourPostsNavigator;
