import React, {useState} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Button, Icon, List, ListItem, Text} from '@ui-kitten/components';

const data = new Array(5).fill({
  title: 'Dog Name',
  description: 'Dog Breed',
});

const Pets = ({navigation}) => {
  const renderAvatar = () => (
    <Image style={styles.avatar} source={require('../../images/avatar.gif')} />
  );

  const renderItem = ({item, index}) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderAvatar}
      onPress={() => navigation.push('Pet Details')}
    />
  );

  return (
    <ImageBackground
      source={require('../../images/background.png')}
      style={{
        resizeMode: 'cover',
        flex: 1,
        padding: 10,
      }}>
      <List style={styles.list} data={data} renderItem={renderItem} />
      <Button appearance="outline">ADD PET</Button>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'transparent',
    maxHeight: '60%',
  },
  bold: {
    fontWeight: 'bold',
  },
  bottomMargin: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  submitBtn: {
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 15,
  },
  name: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
});

export default Pets;
