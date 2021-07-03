import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Text, Divider, List, ListItem} from '@ui-kitten/components';
import CalendarPicker from 'react-native-calendar-picker';

const CalendarView = ({route}) => {
  const [date, setDate] = useState(Date.now());
  const [selectedAppointmentList, setSelectedAppointmentList] = useState();

  const dateStyle = {
    style: {
      backgroundColor: '#CEDDEC',
    },
    textStyle: {color: 'black'}, // sets the font color
    containerStyle: [],
  };

  const appointmentDates = route.params.appointmentList.map(appointment => ({
    date: appointment.start_date,
    end_date: appointment.end_date,
    vetName: appointment.vet_name,
    status: appointment.status,
    ...dateStyle,
  }));

  const renderItem = ({item}) => (
    <ListItem>
      <View style={styles.itemContainer}>
        <View style={styles.itemDetails}>
          <Text style={styles.bold}>
            {moment(item.date).format('hh:mm A')} -{' '}
            {moment(item.end_date).format('hh:mm A')}
          </Text>
          <Text category="s1">{`Appointment with ${item.vetName}`}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text
            category="c1"
            style={
              item.status === 'approved'
                ? {color: 'green'}
                : item.status === 'rejected' || item.status === 'cancelled'
                ? {color: 'red'}
                : {}
            }>
            {item.status &&
              item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>
    </ListItem>
  );

  useEffect(() => {
    const filteredList = appointmentDates.filter(
      appointment =>
        moment(appointment.date).format('YYYY-MM-DD') ===
        moment(date).format('YYYY-MM-DD'),
    );

    setSelectedAppointmentList(filteredList);
  }, [date]);

  return (
    <ImageBackground
      source={require('../../images/background.png')}
      style={{
        resizeMode: 'cover',
        flex: 1,
        padding: 10,
      }}>
      <View style={styles.container}>
        <CalendarPicker
          todayBackgroundColor="#CFCCF4"
          selectedStartDate={date}
          selectedDayColor="#7068DE"
          selectedDayTextColor="#fff"
          customDatesStyles={appointmentDates}
          onDateChange={selectedDate => setDate(selectedDate)}
        />

        <View style={styles.dateContainer}>
          <View>
            <Text category="h5">{moment(date).format('LL')}</Text>
          </View>
          <View style={styles.listContainer}>
            <List
              data={selectedAppointmentList}
              ItemSeparatorComponent={Divider}
              renderItem={renderItem}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
  },
  dateContainer: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
  },
  listContainer: {
    maxHeight: 170,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  itemDetails: {
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  statusContainer: {
    alignContent: 'center',
  },
});

export default CalendarView;
