import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Card, List, Text} from '@ui-kitten/components';
import ContentTitle from './ContentTitle';

const data = new Array(8).fill({
  title: 'Item',
});

const Posts = () => {
  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <Image
        style={styles.img}
        source={require('../../images/post-sample-img.png')}
      />
    </View>
  );

  const renderItemFooter = footerProps => (
    <Text {...footerProps}>By Wikipedia</Text>
  );

  const renderItem = info => (
    <Card
      style={styles.item}
      status="basic"
      header={headerProps => renderItemHeader(headerProps, info)}
      footer={renderItemFooter}>
      <Text>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ContentTitle title="Latest Posts" />
      <List
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  img: {
    alignSelf: 'center',
  },
});

export default Posts;
