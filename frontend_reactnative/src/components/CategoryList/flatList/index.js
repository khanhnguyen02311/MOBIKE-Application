import {View, Text, FlatList, ScrollView} from 'react-native';
import React from 'react';
import ListItem from '../listItem';

const renderItem = ({item, index}) => {
  return <ListItem item={item} index={index} />;
};

const keyExtractor = item => {
  return item.id;
};

const CategoryList = ({data, ...props}) => {
  return (
    // <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <FlatList
      contentContainerStyle={{
        alignSelf: 'flex-start',
      }}
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...props}
    />
    // </ScrollView>
  );
};

export default CategoryList;
