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

const ProfileMenu = ({navigation}) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={{
          marginTop: 10,
          marginLeft: 20,
          display: 'flex',
          flexDirection: 'row',
        }}
        onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={23} color="#999" />
        <Text style={{marginLeft: 5, color: '#444'}}>Back</Text>
      </TouchableOpacity> */}
      <View style={styles.headerContainer}>
        <Header />
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
