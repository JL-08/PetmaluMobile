import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, Image, RefreshControl} from 'react-native';
import {Card, List, Text, Divider, Modal} from '@ui-kitten/components';
import ContentTitle from './ContentTitle';
import moment from 'moment';

import {getAllPosts} from '../../actions/postActions';

const data = new Array(8).fill({
  title: 'Item',
});

const Posts = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [image, setImage] = React.useState();
  const posts = useSelector(state => state.post.postData);
  const dispatch = useDispatch();

  useEffect(() => {
    setRefreshing(true);
    dispatch(getAllPosts(setRefreshing));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllPosts(setRefreshing));
  }, []);

  const renderItemHeader = (headerProps, item) => (
    <View {...headerProps}>
      <View style={styles.row}>
        <Text style={{fontWeight: 'bold', flex: 1}} category="h6">
          {item.title}
        </Text>
        <Text style={{color: '#888', alignSelf: 'flex-end'}} category="c1">
          {moment(item.created_at).format('MMM DD, YYYY hh:mm A')}
        </Text>
      </View>
      {item.img_name && (
        <>
          <Divider style={{marginVertical: 10}} />
          <Image
            style={styles.img}
            source={{
              uri: `http://petsmalu.xyz/uploads/${item.img_name}`,
            }}
            onError={() =>
              setImage(`http://petsmalu.xyz/image/no_image_found.png`)
            }
          />
        </>
      )}
    </View>
  );

  const renderItemFooter = (footerProps, item) => (
    <View style={{flex: 1}}>
      <Text {...footerProps}>By: {item.vet_name}</Text>
    </View>
  );

  const renderItem = ({item}) => (
    <Card
      style={styles.item}
      status="basic"
      header={headerProps => renderItemHeader(headerProps, item)}
      footer={footerProps => renderItemFooter(footerProps, item)}>
      <Text>{item.body}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ContentTitle title="Latest Posts" />
      <List
        contentContainerStyle={styles.contentContainer}
        data={posts}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    position: 'relative',
    paddingBottom: 50,
    paddingTop: 0,
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  img: {
    alignSelf: 'center',
    width: 400,
    height: 300,
  },
  floatBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    top: '13%',
    right: '10%',
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
  },
  modal: {
    minHeight: 200,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 5,
  },
  modalText: {
    height: 150,
    justifyContent: 'center',
  },
  btnContainer: {
    justifyContent: 'space-around',
  },
  contentTitle: {
    fontWeight: 'bold',
    flex: 1,
  },
});

export default Posts;
