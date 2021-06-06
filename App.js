import React from 'react';
import Auth from './src/components/Auth/Auth';

import {Text, View, ImageBackground} from 'react-native';

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
