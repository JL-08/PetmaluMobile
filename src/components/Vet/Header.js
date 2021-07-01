import React from 'react';
import {useSelector} from 'react-redux';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';

const Header = ({navigation}) => {
  const vet = useSelector(state => state.auth.authVetData);

  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.avatarContainer}
        onPress={() => navigation.push('Vet Profile Menu', {vet})}>
        <Image
          style={style.avatar}
          source={require('../../images/avatar.gif')}
        />
      </TouchableOpacity>
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
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  avatarContainer: {
    position: 'absolute',
    left: 15,
    top: 10,
  },
  logo: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
});

export default Header;
