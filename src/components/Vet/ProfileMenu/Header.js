import {Avatar, Text} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, View, ImageBackground, Image} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={require('../../../images/avatar.gif')}
      />
      <Text style={styles.name} category="h3">
        IAN BENEDICT PACELO
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
  },
});

export default Header;
