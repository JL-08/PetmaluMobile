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

import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers/index';

import {View} from 'react-native';
import {setCustomText} from 'react-native-global-props';
import ProfileMenu from './src/components/ProfileMenu/ProfileMenu';
import BookingDetails from './src/components/Home/Consultation/BookingDetails';
import Appointments from './src/components/ProfileMenu/Appointments';
import CalendarView from './src/components/ProfileMenu/CalendarView';
import ProfileView from './src/components/ProfileMenu/ProfileView';
import Pets from './src/components/ProfileMenu/Pets';
import PetDetails from './src/components/ProfileMenu/PetDetails';
import AddPet from './src/components/ProfileMenu/AddPet';
import VetLogin from './src/components/Vet/VetLogin';
import VetHome from './src/components/Vet/VetHome';
import VetProfileMenu from './src/components/Vet/ProfileMenu/ProfileMenu';
import CreatePost from './src/components/Vet/CreatePost';
import EditPost from './src/components/Vet/EditPost';
import History from './src/components/Vet/ProfileMenu/History';
import VetProfileView from './src/components/Vet/ProfileMenu/VetProfileView';

const customTextProps = {
  style: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: 'black',
  },
};
setCustomText(customTextProps);

const Stack = createStackNavigator();
const store = createStore(reducers, compose(applyMiddleware(thunk)));

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
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
                  name="Login as Vet"
                  component={VetLogin}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#44609D',
                    },
                    headerTintColor: 'white',
                  }}
                />
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Vet Home"
                  component={VetHome}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="Profile Menu"
                  component={ProfileMenu}
                  options={{
                    headerShown: true,
                  }}
                />
                <Stack.Screen
                  name="Vet Profile Menu"
                  component={VetProfileMenu}
                  options={{
                    headerShown: true,
                  }}
                />
                <Stack.Screen
                  name="Booking Details"
                  component={BookingDetails}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="Appointments"
                  component={Appointments}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="Calendar"
                  component={CalendarView}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="My Profile"
                  component={ProfileView}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="My Pets"
                  component={Pets}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="Pet Details"
                  component={PetDetails}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="Add a Pet"
                  component={AddPet}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="Create a New Post"
                  component={CreatePost}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="Edit Post"
                  component={EditPost}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="Appointment History"
                  component={History}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
                <Stack.Screen
                  name="Vet Profile"
                  component={VetProfileView}
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#7068DE',
                    },
                    headerTintColor: '#fff',
                  }}
                />
              </Stack.Navigator>
            </View>
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
