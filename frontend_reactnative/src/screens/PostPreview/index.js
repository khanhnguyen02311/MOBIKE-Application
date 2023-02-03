import React from 'react';
import { Text, View } from 'react-native';
import PostPreviewComponent from '../../components/PostPreviewComponent';

const PostPreview = ({
    navigation,
    route,
}) => {
    const { form } = route.params;
    return (
         <PostPreviewComponent form={form} />
    )
};

export default PostPreview;
