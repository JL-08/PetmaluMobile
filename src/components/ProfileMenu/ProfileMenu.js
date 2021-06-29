import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Header from './Header';
import Menu from './Menu';

const ProfileMenu = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header userName={route.params.user.name} />
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
