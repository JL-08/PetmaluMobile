import {Avatar, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ImageBackground, Image} from 'react-native';

const Header = ({user}) => {
  const [image, setImage] = useState();

  useEffect(() => {
    if (user) {
      setImage(`http://petsmalu.xyz/uploads/${user.img_name}`);
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{
          uri: image,
        }}
        onError={() =>
          setImage('http://petsmalu.xyz/images/default_avatar.gif')
        }
      />
      <View style={styles.textLength}>
        <Text style={styles.name} category="h3">
          {user.name.toUpperCase()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  textLength: {
    maxWidth: '80%',
  },
});

export default Header;
