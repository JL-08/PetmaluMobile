import React from 'react';
import {Text, View, ImageBackground} from 'react-native';

const Consultation = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <ImageBackground
        source={require('../../images/background.png')}
        style={{
          resizeMode: 'cover',
          flex: 1,
        }}>
        <Text>Consultation</Text>
      </ImageBackground>
    </View>
  );
};

export default Consultation;
