import 'react-native-gesture-handler';
import React from 'react';
import Auth from './src/components/Auth/Auth';
import Home from './src/components/Home/Home';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

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

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ImageBackground
          source={require('./src/images/background.png')}
          style={{
            resizeMode: 'cover',
            flex: 1,
          }}>
          <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </ImageBackground>
      </View>
    </NavigationContainer>
  );
};

export default App;
