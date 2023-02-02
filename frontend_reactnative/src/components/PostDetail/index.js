import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { Text, View } from 'react-native';
import { Root, Popup } from 'popup-ui'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/theme/colors';
import Container from '../common/container';
import Carousel from '../Banner/carousel';
import data from '../../data/imageBanner';
import { Image } from 'react-native';
import Store from '../../redux/store';
import { color } from 'react-native-reanimated';
import ReadMore from '@fawazahmed/react-native-read-more';
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { MARKETPLACE, YOUR_POSTS } from '../../constants/routeNames';

const widthScreen = Dimensions.get('window').width;

const PostDetailComponent = ({
    postID,
}) => {

    const form = {
        images: [{
            uri: 'file:///data/user/0/com.frontend_reactnative/cache/rn_image_picker_lib_temp_d54e23b2-c4f5-4986-91e2-2fb91ebbce02.jpg'
        }, {
            uri: 'file:///data/user/0/com.frontend_reactnative/cache/rn_image_picker_lib_temp_1596db12-294f-4415-94bd-7208b2cb076c'
        }, {
            uri: 'file:///data/user/0/com.frontend_reactnative/cache/rn_image_picker_lib_temp_5bc98407-8c88-43fc-81d9-c286bf8e97e8.jpg'
        }],
        type: 1,
        title: 'SC Project S1 KTM12-41T Slip On Titanium Exhaust | KTM Duke 790',
        price: 45000000,
        content: 'The Honda Master 125cc is a very comfortable bike for travelling Vietnam thanks to the riding position and the large seat. It is reliable and have easily enough power to take 1 or 2 people through the country. \nThe Honda Master has a high cruising speed means that you can cover many km in a day and still not feel uncomfortable.While it doesn’t offer the off road capabilities of the Honda XR it is great for the highway and main roads between HCM and Hanoi and is available at a cheaper price. \nThe price shown below is for a month rent but you can see the daily and longer rental price on the right side. \nThe Honda Master comes with a rack suitable for 1 bag and a strong phone holder for navigation as well as a map, a D- Lock and bungee cords.',
        name: 'ABC',
        lineup: '1',
        manufacturerYear: 2020,
        condition: 1,
        cubicPower: 125,
        odometer: 10000,
        color: 1,
        brand: 1,
        licensePlate: '29A-12345',
    }

    //Brand
    const brandNameFromID = (ID) => {
        const brand = Store.getState().vehicleModels.VehicleBrands.find((item) => item.ID == ID);
        if (brand)
            return brand.Name;
        else return '';
    };

    //Lineup
    const lineupNameFromID = (ID) => {
        const lineup = Store.getState().vehicleModels.VehicleLineUps.find((item) => item.ID == ID);
        if (lineup)
            return lineup.Lineup;
        else return '';
    };

    //Type
    const typeNameFromID = (ID) => {
        const type = Store.getState().vehicleTypes.find((item) => item.ID == ID);
        if (type)
            return type.Type;
        else return '';
    };

    //Color
    const colorNameFromID = (ID) => {
        const color = Store.getState().colors.find((item) => item.ID == ID);
        if (color)
            return convertFirstCharacterToUppercase(color.Name);
        else return '';
    };

    const colorHexFromID = (ID) => {
        const color = Store.getState().colors.find((item) => item.ID == ID);
        if (color)
            return '#' + color.Color_hex;
        else return '';
    };

    const convertFirstCharacterToUppercase = (stringToConvert) => {
        var firstCharacter = stringToConvert.substring(0, 1);
        var restString = stringToConvert.substring(1);
        return firstCharacter.toUpperCase() + restString;
    }


    //Condition
    const conditionNameFromID = (ID) => {
        const condition = Store.getState().vehicleConditions.find((item) => item.ID == ID);
        if (condition)
            return condition.Condition;
        else return '';
    };

    // //Price
    const formatPrice = (price) => {
        if (price == undefined) return '';
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const [showDetail, setShowDetail] = React.useState(false);
    const onShowDetail = () => {
        setShowDetail(true);
    }

    const onHideDetail = () => {
        setShowDetail(false);
    }

    const starAverage = 4.5;
    const ratingList = [{
        ID: 1,
    },
    {
        ID: 2,
    },
    ];

    return (
        <Root style={{ height: '100%', position: 'relative' }}>
            <Container
                keyboardShouldPersistTaps="always"
                styleScrollView={{ backgroundColor: '#FFFFFF' }}>

                {/* Image */}
                <Carousel data={form.images} isUri={true} />

                <View style={{ paddingHorizontal: 20, marginTop: 5, }}>

                    {/* Type */}
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
                        <FontAwesome name="circle" size={8} color={colors.secondary} />
                        <Text style={{ color: colors.text, fontSize: 12, marginLeft: 8, fontWeight: '500' }}>{typeNameFromID(form.type)}</Text>
                    </View>

                    {/* Title */}
                    <View style={{ alignSelf: 'flex-start', marginTop: 5, paddingHorizontal: 5 }}>
                        <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 16 }}>{form.title}</Text>
                    </View>

                    {/* Price */}
                    <View style={{ alignSelf: 'flex-start', marginTop: 5, paddingHorizontal: 5, flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: colors.textRed, fontSize: 18 }}>{formatPrice(form.price) + ' VND'}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
                                <Octicons name="star-fill" size={16} color={'#FCC72E'} />
                                <Text style={{ color: '#000', fontSize: 14, marginLeft: 5, fontWeight: '500' }}>{starAverage}</Text>
                            </View>
                            <Text style={{ color: '#000', fontSize: 12, fontWeight: '300', fontStyle: 'italic' }}>/ {ratingList.length} Reviews</Text>
                        </View>
                    </View>
                </View>

                <View style={{ height: 1, backgroundColor: '#E8E8E8', marginTop: 20, }} />



                {/* Description */}
                {false &&
                    (<View style={{ paddingHorizontal: 20, marginTop: 15 }}>
                        <ReadMore onExpand={onShowDetail} onCollapse={onHideDetail} seeMoreStyle={{ color: colors.text, fontStyle: 'italic', }} seeLessStyle={{ color: colors.text, fontStyle: 'italic' }} style={{ color: '#384653', fontSize: 14, fontWeight: '400' }} numberOfLines={10}>{form.content}</ReadMore>
                        {showDetail &&
                            (
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ marginBottom: 15, fontWeight: '500', color: '#000' }}>Detail Information</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 5 }}>
                                        <View style={{ width: widthScreen / 2 - 30 }}>

                                            {/* Name */}
                                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                                <MaterialIcons name='drive-file-rename-outline' size={18} color={colors.primary} />
                                                <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Name : </Text>
                                                <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{form.name}</Text>
                                            </View>

                                            {/* Lineup */}
                                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                                <MaterialIcons name='label' size={18} color={colors.primary} />
                                                <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Lineup : </Text>
                                                <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{lineupNameFromID(form.lineup)}</Text>
                                            </View>

                                            {/* Condition */}
                                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                                <MaterialCommunityIcons name='list-status' size={18} color={colors.primary} />
                                                <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Condition : </Text>
                                                <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{conditionNameFromID(form.condition)}</Text>
                                            </View>

                                            {/* Manufacturer Year */}
                                            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                                <Fontisto name='date' size={18} color={colors.primary} />
                                                <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Year : </Text>
                                                <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{form.manufacturerYear}</Text>
                                            </View>

                                        </View>
                                        <View style={{ width: widthScreen / 2 - 30 }}>
                                            <View>

                                                {/* Branch */}
                                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                                    <MaterialIcons name='motorcycle' size={18} color={colors.primary} />
                                                    <Text style={{ marginLeft: 5, color: '#555', fontWeight: '400' }}>Branch : </Text>
                                                    <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{brandNameFromID(form.brand)}</Text>
                                                </View>

                                                {/* Color */}
                                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                                    <FontAwesome name='circle' size={18} color={colorHexFromID(form.color)} />
                                                    <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>Color : </Text>
                                                    <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{colorNameFromID(form.color)}</Text>
                                                </View>

                                                {/* Odometer */}
                                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                                    <Ionicons name='speedometer' size={18} color={colors.primary} />
                                                    <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>Odometer : </Text>
                                                    <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{form.odometer}</Text>
                                                </View>

                                                {/* Cubic Power */}
                                                <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                                                    <MaterialIcons name='speed' size={18} color={colors.primary} />
                                                    <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>Cubic Power : </Text>
                                                    <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{form.cubicPower}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                    {/* License Plate */}
                                    <View style={{ flexDirection: 'row', marginBottom: 15, paddingLeft: 7 }}>
                                        <Octicons name='number' size={18} color={colors.primary} />
                                        <Text style={{ marginLeft: 8, color: '#555', fontWeight: '400' }}>License Plate : </Text>
                                        <Text style={{ marginLeft: 5, color: '#000', fontWeight: '400', flex: 1 }}>{form.licensePlate}</Text>
                                    </View>
                                </View>
                            )}
                    </View>)}

                {/* <View style={{ height: 100 }} /> */}
            </Container>
        </Root>
    );
}

export default PostDetailComponent;

const styles = StyleSheet.create({
    box: {
        height: 250,
        width: '100%',
    },
    boxA: {
        backgroundColor: 'white',
    },
    boxB: {
        backgroundColor: '#D8D8D8',
    },
    header: {
        height: HEADER_HEIGHT,
        width: '100%',
        backgroundColor: '#2196f3',
    },
})