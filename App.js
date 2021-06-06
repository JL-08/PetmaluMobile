import React from 'react';
import Auth from './src/components/Auth/Auth';

import {Text, View} from 'react-native';

const App = () => {
  return (
    <View style={{backgroundColor: '#eee', flex: 1}}>
      <Auth />
    </View>
  );
};

export default App;
