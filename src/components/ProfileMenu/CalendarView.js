import moment from 'moment';
import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Text, Divider, List, ListItem} from '@ui-kitten/components';
import CalendarPicker from 'react-native-calendar-picker';

let customDatesStyles = [];
customDatesStyles.push({
  date: '2021-06-16',
  style: {
    backgroundColor: '#CEDDEC',
  },
  textStyle: {color: 'black'}, // sets the font color
  containerStyle: [], // extra styling for day container
});

customDatesStyles.push({
  date: '2021-06-28',
  style: {
    backgroundColor: '#CEDDEC',
  },
  textStyle: {color: 'black'}, // sets the font color
  containerStyle: [], // extra styling for day container
});

const data = new Array(8).fill({
  title: 'Item',
  description: 'Description for Item',
});

const CalendarView = () => {
  const [date, setDate] = useState(Date.now());

  const renderItem = ({item, index}) => (
    <ListItem title="01:00 PM" description="Appointment with Dr. Strange" />
  );

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
          customDatesStyles={customDatesStyles}
          onDateChange={selectedDate => setDate(selectedDate)}
        />

        <View style={styles.dateContainer}>
          <View>
            <Text category="h5">{moment(date).format('LL')}</Text>
          </View>
          <View style={styles.listContainer}>
            <List
              data={data}
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
});

export default CalendarView;
