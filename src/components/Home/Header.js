import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={style.container}>
      <Image style={style.avatar} source={require('../../images/avatar.gif')} />
      <View
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          flex: 1,
        }}>
        <Image
          style={style.logo}
          source={require('../../images/Petmalu-2.png')}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    left: 10,
    top: 5,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
});

export default Header;
