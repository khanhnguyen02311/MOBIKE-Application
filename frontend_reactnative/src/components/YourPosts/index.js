import { View, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import React from 'react';
import colors from '../../assets/theme/colors';
import { ADD_POST } from '../../constants/routeNames';
import { useNavigation } from '@react-navigation/native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import ShowingRoute from './ShowingRoute';
import PendingRoute from './PendingRoute';
import UnavailableRoute from './UnavailableRoute';
import { useWindowDimensions } from 'react-native';
import Container from '../common/container';

const heightScreen = Dimensions.get('window').height;

const YourPostsComponent = () => {
  const { navigate } = useNavigation();

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'Showing', title: 'Showing' },
    { key: 'Pending', title: 'Pending' },
    { key: 'Unavailable', title: 'Unavailable' },
  ]);

  const renderScene = SceneMap({
    Showing: ShowingRoute,
    Pending: PendingRoute,
    Unavailable: UnavailableRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={colors.text}
      inactiveColor={'#8D8D8D'}
      indicatorStyle={{ backgroundColor: colors.secondary, height: 3, }}
      labelStyle={{ fontSize: 14, fontWeight: '500', textTransform: 'none' }}
      pressOpacity={0.8}
      pressColor={'#C0DAF155'}
      style={{ backgroundColor: 'white', elevation: 0, borderBottomWidth: 1, borderBottomColor: '#E8E8E8' }}
    />
  );
  return (
    <View style={{ height: '100%' }}>

      <TouchableWithoutFeedback
        onPress={() => {
          navigate(ADD_POST);
        }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: colors.primary,
            padding: 10,
            borderRadius: 5,
            backgroundColor: colors.primary,
          }}>
          <Text style={{color: colors.white}}>Add post</Text>
        </View>
      </TouchableWithoutFeedback>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />


    </View>
  );
};

export default YourPostsComponent;
