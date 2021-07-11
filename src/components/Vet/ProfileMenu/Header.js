import {Avatar, Text} from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ImageBackground, Image} from 'react-native';

const Header = ({vetName, vetImg}) => {
  const [image, setImage] = useState();

  useEffect(() => {
    setImage(`http://petsmalu.xyz/uploads/${vetImg}`);
  }, []);

  return (
    <View style={styles.container}>
      {console.log('img', vetImg)}
      <Image
        style={styles.avatar}
        source={{
          uri: image,
        }}
        onError={() =>
          setImage('http://petsmalu.xyz/images/default_avatar.gif')
        }
      />
      <Text style={styles.name} category="h3">
        {vetName && vetName.toUpperCase()}
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
