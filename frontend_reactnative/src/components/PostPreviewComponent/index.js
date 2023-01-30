import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { Text, View } from 'react-native';
import { Root, Popup } from 'popup-ui'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../../assets/theme/colors';
import Container from '../common/container';
import Carousel from '../Banner/carousel';
import data from '../../data/imageBanner';
import { Image } from 'react-native';
import store from '../../redux/store';
const PostPreviewComponent = ({
    form,
}) => {
    console.log(form.images);

    const typeNameFromID = (ID) => {
        const type = store.getState().vehicleTypes.find((item) => item.ID == ID);
        if (type)
            return type.Type;
        else return '';
    };
    return (
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
                <View style={{ alignSelf: 'flex-start', marginTop: 5, paddingHorizontal: 5 }}>
                    <Text style={{ fontWeight: 'bold', color: '#000', fontSize: 18 }}>{form.price}</Text>
                </View>

            </View>

        </Container>
    )
};

export default PostPreviewComponent;
