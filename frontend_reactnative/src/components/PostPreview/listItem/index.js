import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import MobikeImage from '../../common/image';
import { POST_DETAIL, POST_DETAIL_NAVIGATOR } from '../../../constants/routeNames';
import { brandNameFromID, formatPrice, typeNameFromID } from '../../../utils/idToProperty';
import { selectPost } from '../../../redux/slice/selectedPostSlice';
import { TouchableWithoutFeedback } from 'react-native';

const PostPreview = ({
  postID,
  index,
}) => {

  const postInfo = {
    images: [{
      ID: '190',
    }, {
      ID: '2',
    }, {
      ID: '3',
    }],
    title: 'SC Project S1 KTM12-41T Slip On Titanium Exhaust | KTM Duke 790',
    price: 945000000,
    manufacturerYear: 2020,
    type: 1,
    brand: 1,
  }

  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const onNavigate = () => {
    navigate(POST_DETAIL_NAVIGATOR, { screen: POST_DETAIL });
    dispatch(selectPost({ ID: '1' }));
  };
  return (
    <TouchableWithoutFeedback onPress={onNavigate} key={index ? index : 0}>
      <View
        style={[styles.styleWrapper, index === 0 ? { marginStart: 20 } : null]}>
        <MobikeImage imageID={postInfo.images[0].ID} style={styles.styleImage} />

        <View style={styles.textWrapper}>
          <Text
            style={styles.styleTitle}
            numberOfLines={1}
            ellipsizeMode="tail">
            {postInfo.title}
          </Text>
          <Text style={styles.styleInfo} numberOfLines={1} ellipsizeMode="tail">
            <Text>{typeNameFromID(postInfo.type)}</Text>
            <Text> - </Text>
            <Text>{brandNameFromID(postInfo.brand)}</Text>
          </Text>

          <Text style={styles.stylePrice}
            numberOfLines={1}
            ellipsizeMode="tail">
            {formatPrice(postInfo.price) + ' VND'}
          </Text>

        </View>
      </View>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  styleWrapper: {
    backgroundColor: '#EDEDED',
    padding: 12,
    borderRadius: 5,
    marginEnd: 13,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  styleImage: {
    width: 135,
    height: 135,
    resizeMode: 'cover',
    borderRadius: 5,
  },

  textWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 3,
  },

  styleTitle: {
    width: 130,
    paddingTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000000',
  },
  styleInfo: {
    width: 130,
    paddingTop: 3,
    fontSize: 12,
    fontWeight: 'normal',
    color: '#000000',
    fontStyle: 'italic',
  },
  stylePrice: {
    width: 130,
    paddingTop: 3,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#BC2424',
  },
});

export default PostPreview;
