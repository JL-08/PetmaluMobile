import React from 'react';
import Auth from './src/components/Auth/Auth';

import {Text, View, ImageBackground} from 'react-native';

import {setCustomText} from 'react-native-global-props';

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: 'black',
  },
};
setCustomText(customTextProps);

const App = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <ImageBackground
        source={require('./src/images/background.png')}
        style={{
          resizeMode: 'cover',
          flex: 1,
        }}>
        <Auth />
      </ImageBackground>
    </View>
  );
};

export default App;
