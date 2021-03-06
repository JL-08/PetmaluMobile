import React, {Component} from 'react';
import Posts from './Posts';
import Calculator from './Calculator';
import Consultation from './Consultation';
import FAQs from './FAQs';
import Header from './Header';

import {StyleSheet, View, ImageBackground} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/dist/Ionicons';
import Appointments from './Appointments';

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../../images/background.png')}
        style={{
          resizeMode: 'cover',
          flex: 1,
        }}>
        <Header navigation={navigation} />
        <View style={{flex: 7}}>
          <Tab.Navigator
            initialRouteName="Home"
            backBehavior="none"
            tabBarOptions={{
              activeTintColor: '#555',
              activeBackgroundColor: '#eee',
            }}>
            <Tab.Screen
              name="Home"
              component={Posts}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: () => <Icon name="home" color="#555" size={30} />,
              }}
            />
            <Tab.Screen
              name="BCS Calculator"
              component={Calculator}
              options={{
                tabBarLabel: 'BCS Calculator',
                tabBarIcon: () => (
                  <Icon name="calculator" color="#555" size={25} />
                ),
              }}
            />
            <Tab.Screen
              name="Consultation"
              component={Consultation}
              options={{
                tabBarLabel: 'Consultation',
                tabBarIcon: () => (
                  <IoniconsIcon
                    name="chatbubble-ellipses"
                    color="#555"
                    size={25}
                  />
                ),
              }}
            />
            {/* <Tab.Screen
              name="Appointments"
              component={Appointments}
              options={{
                tabBarLabel: 'Appointments',
                tabBarIcon: () => (
                  <IoniconsIcon name="time" color="#555" size={25} />
                ),
              }}
            /> */}
            <Tab.Screen
              name="FAQs"
              component={FAQs}
              options={{
                tabBarLabel: 'FAQs',
                tabBarIcon: () => (
                  <Icon name="question-circle" color="#555" size={25} />
                ),
              }}
            />
          </Tab.Navigator>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 8,
  },
});

export default Home;
