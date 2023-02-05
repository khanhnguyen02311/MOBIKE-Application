import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { POST_DETAIL, POST_DETAIL_NAVIGATOR } from '../../constants/routeNames';
import { selectPost } from '../../redux/slice/selectedPostSlice';
import { brandNameFromID } from '../../utils/idToProperty';
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
                <MobikeImage imageID={postInfo.images[0]} style={styles.styleImage} />

                <View style={styles.textWrapper}>
                    <Text
                        style={styles.styleTitle}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {postInfo.title}
                    </Text>
                    <Text style={styles.styleInfo} numberOfLines={1} ellipsizeMode="tail">
                        <Text>{postInfo.manufacturerYear}</Text>
                        <Text> - </Text>
                        <Text>{brandNameFromID(postInfo.brand)}</Text>
                    </Text>

                    <Text
                        style={styles.stylePrice}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {postInfo.price}
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    styleWrapper: {
        backgroundColor: '#EDEDED',
        padding: 13,
        borderRadius: 5,
        marginEnd: 13,
        marginVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    styleImage: {
        width: 120,
        height: 120,
    },

    textWrapper: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },

    styleTitle: {
        width: 115,
        paddingTop: 10,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#000000',
    },
    styleInfo: {
        width: 115,
        paddingTop: 3,
        fontSize: 12,
        fontWeight: 'normal',
        color: '#000000',
        fontStyle: 'italic',
    },
    stylePrice: {
        width: 115,
        paddingTop: 3,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#BC2424',
    },
});

export default PostPreview;
