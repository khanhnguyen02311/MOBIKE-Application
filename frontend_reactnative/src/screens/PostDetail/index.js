import React from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import PostDetailComponent from '../../components/PostDetail';

const PostDetail = ({
    navigation,
}) => {
    useEffect(() => {
        navigation.getParent()
            .getParent()?.setOptions({
                tabBarStyle: {
                    display: 'none',
                },
            });
        return () =>
            navigation.getParent()
                .getParent()?.setOptions({
                    tabBarStyle: { backgroundColor: '#EDF8FF', minHeight: 56, maxHeight: 80 },
                });
    }, [navigation]);

    const selectedPost = useSelector(state => state.selectedPost.ID);

    return (
        <PostDetailComponent postID={selectedPost} />
    );
}

export default PostDetail;
