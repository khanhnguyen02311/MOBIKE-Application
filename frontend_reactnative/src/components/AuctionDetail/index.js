import React, { useEffect, useRef } from 'react';
import {
    Alert,
    StyleSheet,
    TouchableOpacity,
    useWindowDimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { Text, View } from 'react-native';
import { Root, Popup } from 'popup-ui';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import colors from '../../assets/theme/colors';
import Container from '../common/container';
import Carousel from '../Banner/carousel';
import data from '../../data/imageBanner';
import dataPostPreviewList from '../../data/dataPostPreviewList';
import { Image } from 'react-native';
import Store from '../../redux/store';
import Animated, { color } from 'react-native-reanimated';
import ReadMore from '@fawazahmed/react-native-read-more';
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB, Modal, Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import {
    APPLICATION_ADMIN,
    MARKETPLACE,
    PLACE_BID,
    SEE_ALL_BID,
    SEE_ALL_REVIEWS,
    YOUR_POSTS,
} from '../../constants/routeNames';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { height } from '../Banner/carouselItem';
import MobikeImage from '../common/image';
import { useState } from 'react';
import PostPreviewList from '../PostPreview/flatList';
import {
    conditionNameFromID,
    brandNameFromID,
    lineupNameFromID,
    typeNameFromID,
    colorNameFromID,
    colorHexFromID,
    convertFirstCharacterToUppercase,
    formatPrice,
    wardNameFromID,
    districtNameFromID,
    cityNameFromID,
} from '../../utils/idToProperty';
import {
    AppAdminGetPost,
    GetPersonalPostDetail,
    GetPost,
    GetUserInfo,
} from '../../backendAPI';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import store from '../../redux/store';
import { useSelector } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';
import ReportBottomSheetContent from '../PostDetail/ReportBottomSheetContent';
import TextInputOutline from '../common/textInputOutline-Kohana';
import { Keyboard } from 'react-native';
import { AppAdminSetStatus } from '../../backendAPI';

import { Linking } from 'react-native';

const widthScreen = Dimensions.get('window').width;
const heightScreen = Dimensions.get('window').height;
const AuctionDetailComponent = ({ postID, isActivePost, isAdmin }) => {
    const { navigate } = useNavigation();

    const selectedPost = useSelector(state => state.selectedPost.ID);

    const post = {
        images: [
            {
                ID: '1',
            },
            {
                ID: '2',
            },
            {
                ID: '3',
            },
        ],
        type: 1,
        title: 'SC Project S1 KTM12-41T Slip On Titanium Exhaust | KTM Duke 790',
        price: 45000000,
        content:
            'The Honda Master 125cc is a very comfortable bike for travelling Vietnam thanks to the riding position and the large seat. It is reliable and have easily enough power to take 1 or 2 people through the country. \nThe Honda Master has a high cruising speed means that you can cover many km in a day and still not feel uncomfortable.While it doesn’t offer the off road capabilities of the Honda XR it is great for the highway and main roads between HCM and Hanoi and is available at a cheaper price. \nThe price shown below is for a month rent but you can see the daily and longer rental price on the right side. \nThe Honda Master comes with a rack suitable for 1 bag and a strong phone holder for navigation as well as a map, a D- Lock and bungee cords.',
        name: 'ABC',
        lineup: '1',
        manufacturerYear: 2020,
        condition: 1,
        cubicPower: 125,
        odometer: 10000,
        color: 1,
        brand: 1,
        licensePlate: '29A-12345',
    };

    const ratingPost = [
        {
            ID: 1,
            Rating_point: 5,
            Content:
                'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 1,
            User_Info: {
                ID: 1,
                ID_Avatar: 1,
                Name: 'Dang Khoa Nguyen',
            },
            Bid: '$4,500.90'
        },
        {
            ID: 2,
            Rating_point: 4,
            Content: 'Nice bike, good !!!',
            Time_created: '21:30 - 09/01/2022',
            ID_Post: 1,
            ID_Account: 2,
            User_Info: {
                ID: 1,
                ID_Avatar: 2,
                Name: 'Khang Huynh',
            },
            Bid: '$4,400.20'
        },
        {
            ID: 3,
            Rating_point: 3,
            Content: 'Good cusomer service, I like it.',
            Time_created: '21:30 - 01/01/2022',
            ID_Post: 1,
            ID_Account: 3,
            User_Info: {
                ID: 1,
                ID_Avatar: 3,
                Name: 'Khanh Nguyen',
            },
            Bid: '$3,900.50'
        },
        {
            ID: 4,
            Rating_point: 1,
            Content:
                'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 4,
            User_Info: {
                ID: 4,
                ID_Avatar: 4,
                Name: 'Minj07',
            },
            Bid: '$3,300.80'
        },
        {
            ID: 5,
            Rating_point: 2,
            Content: 'Nice bike, good !!!',
            Time_created: '21:30 - 09/01/2022',
            ID_Post: 1,
            ID_Account: 5,
            User_Info: {
                ID: 5,
                ID_Avatar: 5,
                Name: 'Abcdavid',
            },
            Bid: '$3,000.10'
        },
        {
            ID: 6,
            Rating_point: 3,
            Content: 'Good cusomer service, I like it.',
            Time_created: '21:30 - 01/01/2022',
            ID_Post: 1,
            ID_Account: 6,
            User_Info: {
                ID: 6,
                ID_Avatar: 6,
                Name: 'Khanh Nguyen',
            },
            Bid: '$2,500.90'
        },
        {
            ID: 1,
            Rating_point: 5,
            Content:
                'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 1,
            User_Info: {
                ID: 1,
                ID_Avatar: 1,
                Name: 'Dang Khoa Nguyen',
            },
            Bid: '$4,500.90'
        },
        {
            ID: 2,
            Rating_point: 4,
            Content: 'Nice bike, good !!!',
            Time_created: '21:30 - 09/01/2022',
            ID_Post: 1,
            ID_Account: 2,
            User_Info: {
                ID: 1,
                ID_Avatar: 2,
                Name: 'Khang Huynh',
            },
            Bid: '$4,400.20'
        },
        {
            ID: 3,
            Rating_point: 3,
            Content: 'Good cusomer service, I like it.',
            Time_created: '21:30 - 01/01/2022',
            ID_Post: 1,
            ID_Account: 3,
            User_Info: {
                ID: 1,
                ID_Avatar: 3,
                Name: 'Khanh Nguyen',
            },
            Bid: '$3,900.50'
        },
        {
            ID: 4,
            Rating_point: 1,
            Content:
                'Beautiful bike, very good condition, very nice seller, very good price, very good service, very good communication, very good delivery, very good everything. I recommend this seller to everyone. Thank you very much.',
            Time_created: '13:50 - 11/01/2022',
            ID_Post: 1,
            ID_Account: 4,
            User_Info: {
                ID: 4,
                ID_Avatar: 4,
                Name: 'Minj07',
            },
            Bid: '$3,300.80'
        },
        {
            ID: 5,
            Rating_point: 2,
            Content: 'Nice bike, good !!!',
            Time_created: '21:30 - 09/01/2022',
            ID_Post: 1,
            ID_Account: 5,
            User_Info: {
                ID: 5,
                ID_Avatar: 5,
                Name: 'Abcdavid',
            },
            Bid: '$3,000.10'
        },
        {
            ID: 6,
            Rating_point: 3,
            Content: 'Good cusomer service, I like it.',
            Time_created: '21:30 - 01/01/2022',
            ID_Post: 1,
            ID_Account: 6,
            User_Info: {
                ID: 6,
                ID_Avatar: 6,
                Name: 'Khanh Nguyen',
            },
            Bid: '$2,500.90'
        },
    ];

    const starAverage = 4.5;

    //Get post data
    const [isLoading, setIsLoading] = React.useState(false);
    // useEffect(() => {
    //     if (isAdmin) {
    //         getInactivePostByAdmin();
    //     } else if (isActivePost) {
    //         getData();
    //     } else {
    //         getInactivePost();
    //     }
    // }, []);

    // const getData = async () => {
    //     const post = await GetPost(postID);
    //     // console.log('Post Detail: ' + JSON.stringify(post));
    //     setPostInfo(prevPost => post);
    //     const user = await GetUserInfo(post.user.ID);
    //     // console.log('User Info: ' + JSON.stringify(user));
    //     let tmp = Array.from(user.posts.filter(item => item.ID != postID));
    //     let tmp2 = tmp.map(item => {
    //         return item.ID;
    //     });
    //     setPostList(tmp2);
    //     setUserInfo(user);
    //     setIsLoading(false);
    // };

    // const [postInfo, setPostInfo] = React.useState({});
    // const [userInfo, setUserInfo] = React.useState({});
    // const [postList, setPostList] = React.useState([]);

    // //Get inactive post data
    // const getInactivePost = async () => {
    //     const post = await GetPersonalPostDetail(postID);
    //     console.log('Personal Post Detail: ' + JSON.stringify(post));
    //     setPostInfo(post);
    //     setIsLoading(false);
    // };

    // const getInactivePostByAdmin = async () => {
    //     const post = await AppAdminGetPost(postID);
    //     console.log('Post Detail by admin: ' + JSON.stringify(post));
    //     setPostInfo(post);
    //     setIsLoading(false);
    // };

    // const OnApprovePost = () => {
    //     ApprovePost();
    // };

    // const ApprovePost = async () => {
    //     const approveRes = await AppAdminSetStatus(postID, 1, message);
    //     console.log('Approve post: ' + JSON.stringify(approveRes));
    //     navigate(APPLICATION_ADMIN);
    // };

    const _renderSkeleton = () => (
        <SkeletonContent
            containerStyle={[styles.styleWrapper]}
            highlightColor="#C0DAF155"
            isLoading={isLoading}
            layout={[
                {
                    key: 'image',
                    width: widthScreen - 20,
                    height: heightScreen / 3,
                    borderRadius: 5,
                    marginTop: 10,
                },
                {
                    key: 'title',
                    width: widthScreen - 20,
                    height: 50,
                    marginTop: 10,
                    borderRadius: 5,
                },
                {
                    key: 'detail',
                    width: widthScreen - 40,
                    height: 150,
                    marginTop: 10,
                    borderRadius: 5,
                },
                {
                    key: 'detail_information',
                    width: 60,
                    height: 16,
                    marginTop: 10,
                    marginHorizontal: 20,
                    alignSelf: 'flex-start',
                    borderRadius: 5,
                },
                {
                    key: 'detail_information_1',
                    width: widthScreen - 100,
                    height: 20,
                    marginTop: 5,
                    borderRadius: 5,
                },
                {
                    key: 'detail_information_2',
                    width: widthScreen - 100,
                    height: 20,
                    marginTop: 5,
                    borderRadius: 5,
                },
                {
                    key: 'detail_information_3',
                    width: widthScreen - 100,
                    height: 20,
                    marginTop: 5,
                    borderRadius: 5,
                },
                {
                    key: 'detail_information_4',
                    width: widthScreen - 100,
                    height: 20,
                    marginTop: 5,
                    borderRadius: 5,
                },
            ]}
        />
    );

    const renderStarRating = rating => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(
                    <Octicons
                        key={i}
                        name="star-fill"
                        size={10}
                        color="#FCC72E"
                        style={{ marginLeft: i != 1 ? 3 : 0 }}
                    />,
                );
            }
        }
        return stars;
    };

    const onNavigate = () => {
        navigate(SEE_ALL_BID, { ratingPost });
    };

    const DetailRoute = () => (
        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
            <ReadMore
                seeMoreStyle={{ color: colors.text, fontStyle: 'italic' }}
                seeLessStyle={{ color: colors.text, fontStyle: 'italic' }}
                style={{ color: '#384653', fontSize: 14, fontWeight: '400' }}
                numberOfLines={10}>
                Honda CB200X is a bike available at a starting price of Rs. 1,48,554 in India. It is available in only 1 variant and 3 colours. The Honda CB200X is powered by 184.4cc BS6 engine which develops a power of 17 bhp and a torque of 16.1 Nm. With both front and rear disc brakes, Honda CB200X comes up with anti-locking braking system. This CB200X bike weighs 147 kg and has a fuel tank capacity of 12 liters.
                The Honda CB200X is based on the Hornet 2.0 although with styling that is inspired by the CB500X that is sold through Honda’s BigWing showrooms. So, the CB200X gets a half-fairing that features faux air vents on either side and houses a full-LED headlamp that has been borrowed from the Hornet.
            </ReadMore>
            <View style={{ marginTop: 20 }}>
                <Text style={{ marginBottom: 15, fontWeight: '500', color: '#000' }}>
                    Detail Information
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        paddingHorizontal: 5,
                    }}>
                    <View style={{ width: widthScreen / 2 - 30 }}>
                        {/* Brand */}
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <MaterialIcons
                                name="motorcycle"
                                size={18}
                                color={colors.primary}
                            />
                            <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>
                                Brand :{' '}
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 5,
                                    color: '#000',
                                    fontWeight: '400',
                                    flex: 1,
                                }}>
                                Honda
                            </Text>
                        </View>

                        {/* Condition */}
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <MaterialCommunityIcons
                                name="list-status"
                                size={18}
                                color={colors.primary}
                            />
                            <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>
                                Condition :{' '}
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 5,
                                    color: '#000',
                                    fontWeight: '400',
                                    flex: 1,
                                }}>
                                New
                            </Text>
                        </View>

                        {/* Cubic Power */}
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <MaterialIcons name="speed" size={18} color={colors.primary} />
                            <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>
                                Cubic Power :{' '}
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 5,
                                    color: '#000',
                                    fontWeight: '400',
                                    flex: 1,
                                }}>
                                175
                            </Text>
                        </View>

                        {/* Name */}
                        <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                            <AntDesign name="edit" size={18} color={colors.primary} />
                            <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>
                                Name :{' '}
                            </Text>
                            <Text
                                style={{
                                    marginLeft: 5,
                                    color: '#000',
                                    fontWeight: '400',
                                    flex: 1,
                                }}>
                                Honda Adventure
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: widthScreen / 2 - 30 }}>
                        <View>
                            {/* Lineup */}
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <MaterialCommunityIcons
                                    name="label-multiple-outline"
                                    size={18}
                                    color={colors.primary}
                                />
                                <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>
                                    Lineup :{' '}
                                </Text>
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        color: '#000',
                                        fontWeight: '400',
                                        flex: 1,
                                    }}>
                                    CB200X
                                </Text>
                            </View>

                            {/* Color */}
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Ionicons
                                    name="color-palette-outline"
                                    size={18}
                                    color={colors.primary}
                                />
                                <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>
                                    Color :{' '}
                                </Text>
                                <FontAwesome
                                    name="circle"
                                    size={18}
                                    color={"#FF4158"}
                                    style={{ marginLeft: 5 }}
                                />
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        color: '#000',
                                        fontWeight: '400',
                                        flex: 1,
                                    }}>
                                    Red
                                </Text>
                            </View>

                            {/* Odometer */}
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Ionicons
                                    name="speedometer-outline"
                                    size={18}
                                    color={colors.primary}
                                />
                                <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>
                                    Odometer :{' '}
                                </Text>
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        color: '#000',
                                        fontWeight: '400',
                                        flex: 1,
                                    }}>
                                    10000
                                </Text>
                            </View>

                            {/* Manufacturer Year */}
                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Fontisto name="date" size={18} color={colors.primary} />
                                <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>
                                    Year :{' '}
                                </Text>
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        color: '#000',
                                        fontWeight: '400',
                                        flex: 1,
                                    }}>
                                    2020
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                {/* License Plate */}
                <View style={{ flexDirection: 'row', marginBottom: 15, paddingLeft: 7 }}>
                    <Octicons name="number" size={18} color={colors.primary} />
                    <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>
                        License Plate :{' '}
                    </Text>
                    <Text
                        style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>
                        60C - 123456
                    </Text>
                </View>
            </View>
        </View>
    );

    const HistoryRoute = () => {
        if (ratingPost.length == 0) {
            return (
                <View
                    style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#555', fontWeight: '500' }}>No bid yet</Text>
                </View>
            );
        }
        let shorttenRatingPost = ratingPost.slice(0, 5);
        return (
            <View>
                {shorttenRatingPost.map((item, index) => (
                    <View key={index}>
                        <View
                            style={{
                                flexDirection: 'row',
                                paddingTop: 10,
                                marginLeft: 10,
                                alignItems: 'center',
                            }}>
                            <MobikeImage.Avatar
                                ID={item.User_Info.ID_Avatar}
                                style={{ width: 40, height: 40, borderRadius: 500 }}
                            />
                            <View style={{ marginHorizontal: 15, flex: 1 }}>
                                {/* Name & Time Created & Bid */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                color: '#000',
                                                fontWeight: '500',
                                                fontSize: 12,
                                            }}>
                                            {item.User_Info.Name}
                                        </Text>
                                        <Text
                                            style={{
                                                color: '#555',
                                                fontWeight: '300',
                                                fontSize: 10,
                                                fontStyle: 'italic',
                                                marginTop: 5,
                                            }}>
                                            {item.Time_created}
                                        </Text>
                                    </View>
                                    <Text
                                        style={{
                                            color: index == 0 ? '#63F060' : '#8D8D8D',
                                            fontWeight: '500',
                                            fontSize: index == 0 ? 16 : 14,
                                            marginRight: 7,
                                        }}>
                                        {item.Bid}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Seperate */}
                        <View
                            style={{ height: 1, backgroundColor: '#E8E8E8', marginTop: 10 }}
                        />
                    </View>
                ))}

                {/* View All */}
                <View
                    style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback onPress={onNavigate}>
                        <Text
                            style={{
                                color: colors.text,
                                fontWeight: '400',
                                fontStyle: 'italic',
                                fontSize: 12,
                            }}>
                            {'See all (' + ratingPost.length + ') >'}
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    };

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'Details', title: 'Details' },
        { key: 'History', title: 'History' },
    ]);

    const renderScene = SceneMap({
        Details: DetailRoute,
        History: HistoryRoute,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={colors.text}
            inactiveColor={'#8D8D8D'}
            indicatorStyle={{ backgroundColor: colors.secondary, height: 3 }}
            labelStyle={{ fontSize: 14, fontWeight: '500', textTransform: 'none' }}
            pressOpacity={0.8}
            pressColor={'#C0DAF155'}
            style={{
                backgroundColor: 'white',
                elevation: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#E8E8E8',
            }}
        />
    );

    // //Saved post
    // const [isSaved, setIsSaved] = useState(false);

    // const onSetSaved = () => {
    //     setIsSaved(!isSaved);
    // }

    //Report
    const [report, setReport] = useState('');
    const fall = new Animated.Value(1);
    const reportBottomSheet = useRef(null);
    const changeReportBottomSheetVisibility = visibility => {
        reportBottomSheet.current.snapTo(visibility ? 0 : 1);
    };

    const _renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
            </View>
        </View>
    );

    const _renderReportContent = () => (
        <ReportBottomSheetContent
            onSetReport={onSetReport}
            onCloseBottomSheet={() => changeReportBottomSheetVisibility(false)}
        />
    );

    const onSetReport = content => {
        setReport(content);
    };

    const [message, setMessage] = useState('');
    const onSetMessage = content => {
        setMessage(content);
    };

    const OnPlaceBidPress = () => {
        navigate(PLACE_BID);
    };


    return (
        <Root>
            <View style={{ height: '100%', position: 'relative' }}>
                <Animated.View
                    style={{
                        flex: 1,
                        opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
                        height: '100%',
                    }}>
                    {isLoading ? (
                        _renderSkeleton()
                    ) : (
                        <Container
                            keyboardShouldPersistTaps="always"
                            styleScrollView={{
                                backgroundColor: '#FFFFFF',
                            }}>
                            {/* Image */}
                            <Carousel
                                data={[{
                                    url: require('../../assets/images/Honda.webp'),
                                },
                                {
                                    url: require('../../assets/images/Honda.webp'),
                                },
                                {
                                    url: require('../../assets/images/Honda.webp'),
                                },
                                {
                                    url: require('../../assets/images/Honda.webp'),
                                }
                                ]}
                                style={true}
                            />

                            <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
                                {/* Type */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        alignSelf: 'flex-start',
                                    }}>
                                    <FontAwesome
                                        name="circle"
                                        size={8}
                                        color={colors.secondary}
                                    />
                                    <Text
                                        style={{
                                            color: colors.text,
                                            fontSize: 12,
                                            marginLeft: 8,
                                            fontWeight: '500',
                                        }}>
                                        Scooter
                                    </Text>
                                </View>

                                {/* Title */}
                                <View
                                    style={{
                                        alignSelf: 'flex-start',
                                        marginTop: 5,
                                        paddingHorizontal: 5,
                                    }}>
                                    <Text
                                        style={{ fontWeight: 'bold', color: '#000', fontSize: 16 }}>
                                        Honda CB200X Adventure Launched in India | KTM Duke 790
                                    </Text>
                                </View>

                                {/* Price */}
                                <View
                                    style={{
                                        alignSelf: 'flex-end',
                                        marginTop: 5,
                                        paddingHorizontal: 5,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                        alignItems: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            color: colors.textRed,
                                            fontSize: 18,
                                        }}>
                                        $4,500.90
                                    </Text>

                                    {/* End Time */}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginRight: 5,
                                            }}>
                                            <MaterialCommunityIcons name="timer-sand-complete" size={14} color={colors.primary} />
                                            <Text
                                                style={{
                                                    color: '#000',
                                                    fontSize: 14,
                                                    marginLeft: 5,
                                                    fontStyle: 'italic',
                                                    fontWeight: '300',
                                                }}>
                                                2h 40m 27s
                                            </Text>
                                        </View>

                                    </View>
                                </View>
                            </View>

                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={() => null}
                                onIndexChange={setIndex}
                                initialLayout={{ width: layout.width }}
                                renderTabBar={renderTabBar}
                                style={{ marginTop: 5 }}
                            />

                            {index == 0 ? DetailRoute() : HistoryRoute()}

                            {/* Seperate */}
                            <View style={{ backgroundColor: '#F6F6F6', height: 8 }} />

                            <View>
                                {/* Report */}
                                <View
                                    style={{
                                        backgroundColor: '#fff',
                                        flexDirection: 'row',
                                        paddingVertical: 15,
                                        marginHorizontal: 20,
                                    }}>
                                    <Octicons
                                        name="shield-check"
                                        size={36}
                                        color={colors.primary}
                                        style={{ marginRight: 20 }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '400',
                                            fontStyle: 'italic',
                                            flex: 1,
                                            alignSelf: 'center',
                                        }}>
                                        <Text>
                                            This post has been approved. If it has any problem, please{' '}
                                        </Text>
                                        <TouchableWithoutFeedback
                                            onPress={() => changeReportBottomSheetVisibility(true)}>
                                            <Text style={{ color: colors.textRed }}>report here</Text>
                                        </TouchableWithoutFeedback>
                                        <Text>.</Text>
                                    </Text>
                                </View>

                                {/* Seperate */}
                                <View style={{ backgroundColor: '#F6F6F6', height: 8 }} />
                                {/* Seller Info */}
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingTop: 10,
                                        paddingBottom: 12,
                                        marginLeft: 10,
                                    }}>
                                    <Image
                                        source={require('../../assets/images/avatar.jpg')}
                                        style={{
                                            width: 48,
                                            height: 48,
                                            borderRadius: 500,
                                            borderWidth: 1,
                                            borderColor: '#e8e8e8',
                                        }}
                                    />

                                    <View style={{ marginHorizontal: 15, flex: 1 }}>
                                        {/* Name & View Page */}
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                            <Text
                                                style={{
                                                    color: '#000',
                                                    fontWeight: '500',
                                                    fontSize: 14,
                                                    flex: 1,
                                                }}>
                                                Huynh Duy Khang
                                            </Text>
                                            <Text
                                                style={{
                                                    color: colors.text,
                                                    fontWeight: '400',
                                                    fontSize: 12,
                                                    fontStyle: 'italic',
                                                    marginLeft: 10,
                                                }}>
                        View page >
                                            </Text>
                                        </View>

                                        {/* Address */}
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                marginTop: 5,
                                                marginEnd: 15,
                                                alignItems: 'flex-start',
                                                flex: 1,
                                            }}>
                                            <SimpleLineIcons
                                                name="location-pin"
                                                size={12}
                                                color={'#374957'}
                                                style={{ marginTop: 2 }}
                                            />
                                            <Text
                                                style={{
                                                    color: '#555',
                                                    fontWeight: '300',
                                                    fontSize: 12,
                                                    fontStyle: 'italic',
                                                    marginLeft: 5,
                                                }}>
                                                Thong Nhat Ward, Bien Hoa City, Dong Nai Province
                                            </Text>
                                        </View>

                                        {/* Feature */}
                                        <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                            <View
                                                style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                                                <Text style={{ fontSize: 12, color: colors.text }}>
                                                    50
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 10,
                                                        color: '#000',
                                                        fontWeight: '300',
                                                        marginStart: 5,
                                                        marginRight: 15,
                                                    }}>
                                                    Posts
                                                </Text>
                                                <View
                                                    style={{
                                                        height: '90%',
                                                        width: 1,
                                                        backgroundColor: '#e8e8e8',
                                                    }}
                                                />
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'flex-end',
                                                    marginStart: 12,
                                                }}>
                                                <Text style={{ fontSize: 12, color: colors.text }}>
                                                    5.0
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 10,
                                                        color: '#000',
                                                        fontWeight: '300',
                                                        marginStart: 5,
                                                        marginRight: 15,
                                                    }}>
                                                    Rate
                                                </Text>
                                                <View style={{ height: '90%', width: 1, backgroundColor: '#e8e8e8' }} />
                                            </View>

                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'flex-end',
                                                    marginStart: 12,
                                                }}>
                                                <Text style={{ fontSize: 12, color: colors.text }}>
                                                    100%
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 10,
                                                        color: '#000',
                                                        fontWeight: '300',
                                                        marginStart: 5,
                                                        marginRight: 15,
                                                    }}>
                                                    Chat response rate
                                                </Text>
                                                {/* <View style={{ height: '90%', width: 1, backgroundColor: '#e8e8e8' }} /> */}
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* Seperate */}
                                <View style={{ backgroundColor: '#E8E8E8', height: 1 }} />
                            </View>

                            <View style={{ backgroundColor: '#fff', height: 100 }} />
                        </Container>
                    )}
                </Animated.View>

                {/*Report Bottom Sheet*/}
                <BottomSheet
                    ref={reportBottomSheet}
                    snapPoints={[500, 0]}
                    initialSnap={1}
                    callbackNode={fall}
                    onCloseEnd={() => {
                        changeReportBottomSheetVisibility(false);
                    }}
                    enabledGestureInteraction={true}
                    renderHeader={_renderHeader}
                    renderContent={_renderReportContent}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: '100%',
                        marginTop: 10,
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: '#FFF',
                        height: 70,
                        borderTopWidth: 1,
                        borderTopColor: '#EDEDED',
                        alignItems: 'center',
                    }}>
                    {/* TODO: PostDetail bottom bar  */}

                    <View
                        style={{
                            width: '90%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                OnPlaceBidPress();
                            }}>
                            <View
                                style={{
                                    backgroundColor: colors.secondary,
                                    width: '100%',
                                    height: '60%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                }}>
                                <Text
                                    style={{
                                        color: colors.text,
                                        fontSize: 15,
                                        fontWeight: '500',
                                    }}>
                                    Place a Bid
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    {/* <FAB
                        onPress={() => {
                            Linking.openURL(`tel:${userInfo.accountinfo.Phone_number}`)
                        }}
                        label='Call'
                        icon='phone'
                        variant='extended'
                        size='small'
                        style={{
                            backgroundColor: "#59FB69",
                            Bottom: 0,
                            paddingHorizontal: 30,
                            height: 50,
                        }} >

                        </FAB>
                             */}
                </View>
            </View>
        </Root>
    );
};

export default AuctionDetailComponent;

const styles = StyleSheet.create({
    styleWrapper: {
        backgroundColor: '#EDEDED',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#fff',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#ddd',
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
});
