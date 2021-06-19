import React from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {Text, List, Button} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const data = new Array(8).fill({
  title: 'Item',
});

const Appointments = ({navigation}) => {
  const renderItem = info => (
    <View style={{...styles.card, ...styles.row}}>
      <Image
        style={styles.avatar}
        source={require('../../images/avatar.gif')}
      />
      <View>
        <View>
          <Text category="h6" style={styles.name}>
            Dr. Shan Valdez
          </Text>
          <Text category="c1">Doctor of Veterinary Medicine</Text>
        </View>
        <Text style={{marginTop: 5}}>Online Consultation</Text>
        <View style={{...styles.row}}>
          <Icon style={styles.icon} name="clock-o" color="#888" size={20} />
          <View style={{marginTop: 5}}>
            <Text category="p2">June 11, 2021, Wednesday</Text>
            <Text category="p2">01:00 PM - 05:00 PM</Text>
          </View>
        </View>
        <Button style={styles.btn} size="small">
          DETAILS
        </Button>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../images/background.png')}
      style={{
        resizeMode: 'cover',
        flex: 1,
        padding: 10,
      }}>
      <Text style={{color: '#555'}} category="p1">
        Note: Booking fee will be completely refuned if the veterinarian cancels
        or did not approve your appointment after 24 hours of booking
      </Text>
      <Button
        style={styles.calendarBtn}
        appearance="outline"
        size="small"
        accessoryLeft={props => (
          <Icon size={20} name="calendar" color="#7068DE" />
        )}
        onPress={() => navigation.push('Calendar')}>
        CHECK CALENDAR
      </Button>
      <List
        style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}}
        data={data}
        renderItem={renderItem}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
  },
  name: {
    fontWeight: 'bold',
  },
  icon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  btn: {
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  calendarBtn: {
    marginTop: 10,
  },
});
export default Appointments;
