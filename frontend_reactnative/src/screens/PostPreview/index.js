import React from 'react';
import { Text, View } from 'react-native';
import PostPreviewComponent from '../../components/PostPreviewComponent';

const PostPreview = ({
    navigation,
    route: { params: { form } },
}) => {
    return (
        <PostPreviewComponent form={form} />
    )
};

export default PostPreview;
