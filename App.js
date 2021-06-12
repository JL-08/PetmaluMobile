import 'react-native-gesture-handler';
import React from 'react';
import Auth from './src/components/Auth/Auth';
import Home from './src/components/Home/Home';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {View} from 'react-native';
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
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <View style={{flex: 1, flexDirection: 'column'}}>
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
          </View>
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

export default App;
