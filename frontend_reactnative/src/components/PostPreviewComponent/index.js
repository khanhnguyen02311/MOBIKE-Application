import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { TouchableNativeFeedback } from 'react-native';
import { Text, View } from 'react-native';
import { Root, Popup } from 'popup-ui'
import colors from '../../assets/theme/colors';
import Container from '../common/container';
const PostPreviewComponent = ({
    form,
}) => {

    return (
        <Container
            keyboardShouldPersistTaps="always"
            styleScrollView={{ backgroundColor: '#FFFFFF' }}>

        </Container>

    )
};

export default PostPreviewComponent;
