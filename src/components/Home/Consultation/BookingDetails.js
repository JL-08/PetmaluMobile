import {Text, Button, Divider} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const BookingDetails = ({route, navigation: {goBack}}) => {
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={{
          marginVertical: 10,
          display: 'flex',
          flexDirection: 'row',
        }}
        onPress={() => goBack()}>
        <Icon name="chevron-left" size={23} color="#999" />
        <Text style={{marginLeft: 5, color: '#444'}}>Back</Text>
      </TouchableOpacity> */}
      <Text style={styles.title} category="h5">
        BOOKING FEE
      </Text>
      <Text style={styles.topMargin}>{route.params.type} Consultation</Text>
      <View style={styles.tableContainer}>
        <View style={styles.description}>
          <Text category="h6" style={styles.textPadding}>
            Consultation Fee
          </Text>
          <Text category="h6" style={styles.textPadding}>
            Service Charge
          </Text>
          <Text category="h6" style={styles.textBorder}>
            Total
          </Text>
        </View>
        <View style={styles.amounts}>
          <Text category="h6" style={styles.textPadding}>
            300
          </Text>
          <Text category="h6" style={styles.textPadding}>
            70
          </Text>
          <Text category="h6" style={styles.textBorder}>
            370
          </Text>
        </View>
      </View>
      <Text category="p2" style={{color: '#555', ...styles.topMargin}}>
        NOTE: Booking fee will be completely refunded if the veterinarian
        cancels or does not accept your appointments after 24hours of booking.
      </Text>
      <Button style={styles.topMargin}>BOOK APPOINTMENT</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  container: {
    padding: 15,
  },
  tableContainer: {
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    padding: 15,
  },
  row: {
    flexDirection: 'row',
  },
  description: {
    flex: 1,
  },
  amounts: {
    textAlign: 'right',
  },
  textBorder: {
    borderTopWidth: 2,
    paddingVertical: 3,
  },
  textPadding: {
    paddingVertical: 3,
  },
  topMargin: {
    marginTop: 10,
  },
});

export default BookingDetails;
