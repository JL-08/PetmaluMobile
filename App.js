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
import {default as theme} from './custom-theme.json';

import {View} from 'react-native';
import {setCustomText} from 'react-native-global-props';
import ProfileMenu from './src/components/ProfileMenu/ProfileMenu';
import BookingDetails from './src/components/Home/Consultation/BookingDetails';
import Appointments from './src/components/ProfileMenu/Appointments';
import CalendarView from './src/components/ProfileMenu/CalendarView';
import ProfileView from './src/components/ProfileMenu/ProfileView';
import Pets from './src/components/ProfileMenu/Pets';
import PetDetails from './src/components/ProfileMenu/PetDetails';

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
      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
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
              <Stack.Screen
                name="Profile Menu"
                component={ProfileMenu}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="Booking Details"
                component={BookingDetails}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="Appointments"
                component={Appointments}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="Calendar"
                component={CalendarView}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="My Profile"
                component={ProfileView}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="My Pets"
                component={Pets}
                options={{headerShown: true}}
              />
              <Stack.Screen
                name="Pet Details"
                component={PetDetails}
                options={{headerShown: true}}
              />
            </Stack.Navigator>
          </View>
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

export default App;
