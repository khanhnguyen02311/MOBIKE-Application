import React from 'react';
import { Text, View } from 'react-native';
import { GetPersonalPost } from '../../../backendAPI';
import Container from '../../common/container';

const ShowingRoute = ({
    params,
}) => {

    console.log('ShowingRoute: ' + JSON.stringify(GetPersonalPost()));

    return (
        <Container
            keyboardShouldPersistTaps="always"
            styleScrollView={{ backgroundColor: '#FFFFFF' }}>

        </Container>
    )
};

export default ShowingRoute;
