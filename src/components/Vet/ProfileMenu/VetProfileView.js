import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Input, Text, Button} from '@ui-kitten/components';

const VetProfileView = () => {
  const [image, setImage] = useState();
  const vet = useSelector(state => state.auth.authVetData);

  useEffect(() => {
    if (vet) {
      setImage(`http://petsmalu.xyz/uploads/${vet.img_name}`);
    }
  }, [vet]);

  return (
    <ImageBackground
      source={require('../../../images/background.png')}
      style={{
        resizeMode: 'cover',
        flex: 1,
        padding: 10,
      }}>
      <View
        style={{...styles.row, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={styles.avatar}
          source={{
            uri: image,
          }}
          onError={() =>
            setImage('http://petsmalu.xyz/images/default_avatar.gif')
          }
        />
        <Text category="h3" style={styles.name}>
          {vet.name}
        </Text>
      </View>
      <View style={{...styles.bottomMargin, marginTop: 20}}>
        <Text style={styles.bold} category="h6">
          Email:
        </Text>
        <Text category="h6">{vet.email}</Text>
      </View>
      {/* <View style={styles.bottomMargin}>
        <Text style={styles.bold} category="h6">
          Contact Number:
        </Text>
        <Text category="h6">{vet.mobile_num}</Text>
      </View> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 15,
  },
  name: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
});

export default VetProfileView;
