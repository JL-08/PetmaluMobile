import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const BookingDetails = () => {
  return (
    <View>
      <TouchableOpacity
        style={{
          marginTop: 10,
          marginLeft: 20,
          display: 'flex',
          flexDirection: 'row',
        }}
        onPress={() => goBack()}>
        <Icon name="chevron-left" size={23} color="#999" />
        <Text style={{marginLeft: 5, color: '#444'}}>Back</Text>
      </TouchableOpacity>
      <Text>Book</Text>
    </View>
  );
};

export default BookingDetails;
