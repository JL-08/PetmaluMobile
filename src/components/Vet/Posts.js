import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Card, List, Text, Button, Divider, Modal} from '@ui-kitten/components';
import ContentTitle from './ContentTitle';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const data = new Array(8).fill({
  title: 'Item',
});

const Posts = ({navigation}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const renderItemHeader = (headerProps, info) => (
    <View {...headerProps}>
      <View style={styles.row}>
        <Text style={{fontWeight: 'bold', flex: 1}} category="h6">
          Title 1
        </Text>
        <Text style={{color: '#888', alignSelf: 'flex-end'}} category="c1">
          06/20/2021 9:00PM
        </Text>
      </View>
      <Divider style={{marginVertical: 10}} />
      <Image
        style={styles.img}
        source={require('../../images/post-sample-img.png')}
      />
    </View>
  );

  const renderItemFooter = footerProps => (
    <View style={styles.row}>
      <View style={{flex: 1}}>
        <Text {...footerProps}>By Wikipedia</Text>
      </View>
      <View style={styles.row}>
        <Button
          appearance="ghost"
          status="basic"
          onPress={() => navigation.push('Edit Post')}>
          Edit
        </Button>
        <Button
          appearance="ghost"
          status="basic"
          onPress={() => setIsDeleting(true)}>
          Delete
        </Button>
      </View>
    </View>
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
      <Button
        style={styles.floatBtn}
        onPress={() => navigation.push('Create a New Post')}>
        <Icon name="plus" size={24} color="white" />
      </Button>
      <List
        contentContainerStyle={styles.contentContainer}
        data={data}
        renderItem={renderItem}
      />
      <Modal visible={isDeleting}>
        <Card disabled={true} style={styles.modal}>
          <View style={styles.modalText}>
            <Text>Are you sure you want to delete this post?</Text>
          </View>
          <View style={{...styles.row, ...styles.btnContainer}}>
            <Button
              //onPress={handleModalButton}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    position: 'relative',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  img: {
    alignSelf: 'center',
  },
  floatBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: '13%',
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
});

export default Posts;
