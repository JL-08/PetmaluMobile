import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  Button,
  Icon,
  List,
  ListItem,
  Text,
  Modal,
  Card,
} from '@ui-kitten/components';

import {getAllUserPets} from '../../actions/petActons';

const Pets = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [trigger, setTrigger] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.authData);
  const pets = useSelector(state => state.pet.petData);

  useEffect(() => {
    setRefreshing(true);
    dispatch(getAllUserPets(user.user_id, setRefreshing));
  }, []);

  useEffect(() => {
    if (route?.params?.isActionDone) {
      route.params.isActionDone = false;

      setRefreshing(true);
      dispatch(getAllUserPets(user.user_id, setRefreshing));
    }
  }, [route?.params?.isActionDone]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllUserPets(user.user_id, setRefreshing));
  }, []);

  const renderItem = ({item, index}) => (
    <ListItem
      style={styles.itemList}
      onPress={() => navigation.navigate('Pet Details', {...item})}>
      <Image
        style={styles.avatar}
        source={{
          uri:
            item.img_name === null || item.img_name === ''
              ? 'http://petsmalu.xyz/images/default_avatar.gif'
              : `http://petsmalu.xyz/uploads/${item.img_name}`,
        }}
      />
      <View>
        <Text category="h6">{item.name}</Text>
        <Text category="c1" style={{color: '#777'}}>
          {item.breed}
        </Text>
      </View>
    </ListItem>
  );

  return (
    <ImageBackground
      source={require('../../images/background.png')}
      style={styles.imageContainer}>
      <View style={styles.container}>
        <List
          style={styles.list}
          data={pets}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <Button
          style={styles.btn}
          appearance="outline"
          onPress={() => navigation.push('Add a Pet')}>
          ADD PET
        </Button>
      </View>

      <Modal visible={isLoading}>
        <Card disabled={true}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Card>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    resizeMode: 'cover',
    flex: 1,
    padding: 10,
  },
  list: {
    backgroundColor: 'transparent',
  },
  itemList: {
    backgroundColor: 'transparent',
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
