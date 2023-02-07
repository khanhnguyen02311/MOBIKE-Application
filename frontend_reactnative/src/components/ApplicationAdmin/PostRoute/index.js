import React from 'react';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { AppAdminGetInactivePost } from '../../../backendAPI';
import Container from '../../common/container';
import PostPreview from '../../PostPreview/listItem';

const PostRoute = ({
    params,
}) => {
    useEffect(() => {
        getAppAdminGetInactivePost();
    }, [])

    const getAppAdminGetInactivePost = async () => {
        const post = await AppAdminGetInactivePost();
        console.log('Admin Get Inactive Post: ' + JSON.stringify(post));
        let tmp = [];
        for (let i = 0; i < post.length; i++) {
            tmp.push(post[i].ID_Post);
        }
        console.log('Admin Get Inactive Post: ' + JSON.stringify(tmp));
        setInactivePostList(tmp);
        setIsLoading(false);
    }

    const [inactivePostList, setInactivePostList] = React.useState({});

    const [isLoading, setIsLoading] = React.useState(true);
    const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const RenderSkeleton = (index) => {
        return (
            <SkeletonContent
                containerStyle={[styles.styleWrapper, { backgroundColor: '#f5f5f5', }]}
                highlightColor="#C0DAF155"
                isLoading={isLoading}
                layout={
                    [
                        {
                            key: 'image', width: 135,
                            height: 135, borderRadius: 5,
                        },
                        {
                            key: 'title', width: 130,
                            height: 14,
                            marginTop: 10,
                        },
                        {
                            key: 'info', width: 130,
                            height: 10,
                            marginTop: 10,
                        },
                        {
                            key: 'price', width: 130,
                            height: 16,
                            marginTop: 10,
                        },
                    ]}
            >
                <Text>Your content</Text>
                <Text>Other content</Text>
            </SkeletonContent >
        )
    }
    return (
        <Container
            keyboardShouldPersistTaps="always"
            styleScrollView={{
                backgroundColor: '#FFFFFF'
            }}
        >
            <View style={{ marginLeft: 13, }}>

                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {
                        isLoading ? loadingArray.map((item, index) => (<RenderSkeleton key={index} index={index} />))
                            :
                            inactivePostList.map((item, index) => {
                                return (
                                    <PostPreview
                                        postID={item}
                                        key={index}
                                        styleWrapper={{ marginTop: 13, }}
                                        isAdmin={true}
                                        pressable={true} />
                                )
                            })

                    }

                </View>
            </View>
        </Container>

    )
};

export default PostRoute;

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
});
