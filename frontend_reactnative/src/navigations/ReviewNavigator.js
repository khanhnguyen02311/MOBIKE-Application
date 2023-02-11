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
    REVIEW,
    REVIEW_DETAIL_NAVIGATOR,
} from '../constants/routeNames';
import Auction from '../screens/Auction';
import EditAccount from '../screens/EditAccount';
import EditProfile from '../screens/EditProfile';
import Profile from '../screens/Profile';
import Review from '../screens/Review';
import AuctionDetailNavigator from './AuctionDetailNavigator';
import ReviewDetailNavigator from './ReviewDetailNavigator';

const Stack = createNativeStackNavigator();

const ReviewNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={REVIEW}>
            <Stack.Screen
                name={REVIEW}
                component={Review}
                options={{ header: () => <HeaderSearch /> }}
            />

            <Stack.Screen
                name={REVIEW_DETAIL_NAVIGATOR}
                component={ReviewDetailNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
};

export default ReviewNavigator;
