import React from 'react';
import { Image } from 'react-native';
import { Text, View } from 'react-native';

import BrandLogo from './Brand';
import PostImage from './Post';
import Avatar from './Avatar';

export const MobikeImage = ({
    imageID,
    style,
}) => {
    throw new Error(`Deprecated. Use MobikeImage.BrandLogo or MobikeImage.PostImage instead. (${imageID})`)
    return (
    <Image
        source={{ uri: "https://abcdavid-knguyen.ddns.net:30001/image/get/" + imageID }}
        style={[{
            resizeMode: 'contain',
        }, style]}
    />
);}

export default { BrandLogo, PostImage, Avatar };
