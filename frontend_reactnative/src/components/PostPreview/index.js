import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { POST_DETAIL, POST_DETAIL_NAVIGATOR } from '../../constants/routeNames';
import { selectPost } from '../../redux/slice/selectedPostSlice';
import MobikeImage from '../common/image';

const PostPreview = ({
    postID,
}) => {

    const postInfo = {
        images: [{
            ID: '1',
        }, {
            ID: '2',
        }, {
            ID: '3',
        }],
        title: 'SC Project S1 KTM12-41T Slip On Titanium Exhaust | KTM Duke 790',
        price: 45000000,
        manufacturerYear: 2020,
        brand: 1,
    }

    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const onNavigate = () => {
        navigate(POST_DETAIL_NAVIGATOR, { screen: POST_DETAIL });
        dispatch(selectPost({ ID: '1' }));
    };
    let path = item.url;
    return (
        <TouchableWithoutFeedback onPress={onNavigate}>
            <View
                style={[styles.styleWrapper, index === 0 ? { marginStart: 20 } : null]}>
                <MobikeImage imageID={ } />

                <View style={styles.textWrapper}>
                    <Text
                        style={styles.styleTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.title}
                    </Text>
                    <Text style={styles.styleInfo} numberOfLines={1} ellipsizeMode="tail">
                        {item.info}
                    </Text>
                    <Text
                        style={styles.stylePrice}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {item.price}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

export default PostPreview;
