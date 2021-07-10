import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Card, List, Text, Button, Divider, Modal} from '@ui-kitten/components';
import ContentTitle from './ContentTitle';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import moment from 'moment';

import {getAllPosts, deletePost} from '../../actions/postActions';

const Posts = ({navigation, route}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [postToDelete, setPostToDelete] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const posts = useSelector(state => state.post.postData);
  const vet = useSelector(state => state.auth.authVetData);
  const dispatch = useDispatch();

  useEffect(() => {
    setRefreshing(true);
    dispatch(getAllPosts(setRefreshing));
  }, [route?.params?.isActionDone, refreshToken]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    dispatch(getAllPosts(setRefreshing));
  }, []);

  const handleDelete = () => {
    setIsDeleting(false);
    setRefreshing(true);

    dispatch(
      deletePost(
        postToDelete,
        setRefreshing,
        setIsRequestComplete,
        setServerMessage,
      ),
    );
  };

  const renderItemHeader = (headerProps, item) => (
    <View {...headerProps}>
      <View style={styles.row}>
        <Text style={{fontWeight: 'bold', flex: 1}} category="h6">
          {item.title}
        </Text>
      </View>
      {item.img_name && (
        <>
          <Divider style={{marginVertical: 10}} />
          <Image
            style={styles.img}
            source={{
              uri: `http://10.0.2.2/petsmalu/upload/images/${item.img_name}`,
            }}
          />
        </>
      )}
    </View>
  );

  const renderItemFooter = (footerProps, item) => (
    <View style={{...styles.row, padding: 15, alignItems: 'center'}}>
      <Text {...footerProps} style={{color: '#888'}} category="c1">
        {moment(item.created_at).format('MMM DD, YYYY hh:mm A')}
      </Text>
      {/* <View style={{flex: 1}}>
        <Text {...footerProps}>By: {item.vet_name}</Text>
      </View>
      {item.vet_name === vet.name && (
        <View style={styles.row}>
          <Button
            appearance="ghost"
            status="basic"
            onPress={() => navigation.push('Edit Post', {...item})}>
            Edit
          </Button>
          <Button
            appearance="ghost"
            status="basic"
            onPress={() => {
              setIsDeleting(true), setPostToDelete(item.id);
            }}>
            Delete
          </Button>
        </View>
      )} */}
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
      <View style={{...styles.row, alignItems: 'center', marginVertical: 10}}>
        <ContentTitle title="Latest Posts" />
        {/* <Text style={styles.contentTitle} category="h5">
          Latest Posts
        </Text> */}
        {/* <Button
          size="small"
          appearance="ghost"
          status="basic"
          onPress={() => navigation.push('Create a New Post')}
          accessoryLeft={() => <Icon name="plus" size={24} color="#aaa" />}>
          CREATE POST
        </Button> */}
      </View>
      {/* <Button
        style={styles.floatBtn}
        onPress={() => navigation.push('Create a New Post')}>
        <Icon name="plus" size={24} color="white" />
      </Button> */}
      <List
        contentContainerStyle={styles.contentContainer}
        data={posts}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <Modal visible={isDeleting}>
        <Card disabled={true} style={styles.modal}>
          <View style={styles.modalText}>
            <Text>Are you sure you want to delete this post?</Text>
          </View>
          <View style={{...styles.row, ...styles.btnContainer}}>
            <Button
              onPress={handleDelete}
              style={styles.modalBtn}
              size="small"
              status="danger"
              appearance="outline">
              DELETE
            </Button>
            <Button
              onPress={() => setIsDeleting(false)}
              style={styles.modalBtn}
              size="small"
              appearance="outline">
              CANCEL
            </Button>
          </View>
        </Card>
      </Modal>

      <Modal visible={isRequestComplete}>
        <Card disabled={true} style={styles.modal}>
          <View style={styles.modalText}>
            <Text>{serverMessage}</Text>
          </View>
          <Button
            onPress={() => {
              setIsRequestComplete(false);
              setRefreshToken(Date.now());
            }}
            style={styles.modalBtn}
            appearance="ghost">
            OK
          </Button>
        </Card>
      </Modal>

      <Modal visible={isLoading}>
        <Card disabled={true}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Card>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    position: 'relative',
    paddingBottom: 80,
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
