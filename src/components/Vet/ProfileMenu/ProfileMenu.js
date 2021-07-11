import React from 'react';
import {StyleSheet, View} from 'react-native';

import Header from './Header';
import Menu from './Menu';

const ProfileMenu = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          vetName={route.params.vet.name}
          vetImg={route.params.vet.img_name}
        />
      </View>
      <View style={styles.listContainer}>
        <Menu navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  headerContainer: {
    minHeight: 100,
    backgroundColor: '#eee',
  },
  listContainer: {
    height: '100%',
    backgroundColor: '#575656',
  },
});

export default ProfileMenu;
