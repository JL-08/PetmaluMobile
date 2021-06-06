import React from 'react';
import {Text, View, ImageBackground} from 'react-native';

const Calculator = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <ImageBackground
        source={require('../../images/background.png')}
        style={{
          resizeMode: 'cover',
          flex: 1,
        }}>
        <Text>Calculator</Text>
      </ImageBackground>
    </View>
  );
};

export default Calculator;
