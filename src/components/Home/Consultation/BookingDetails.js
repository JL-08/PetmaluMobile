import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text, Button, Modal, Card} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {createAppointment} from '../../../actions/appointmentActions';

const BookingDetails = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [hasRequestError, setHasRequestError] = useState(false);
  const dispatch = useDispatch();

  const handleBookBtn = () => {
    setIsLoading(true);
    dispatch(
      createAppointment(
        route.params.appointment,
        setServerMessage,
        setIsRequestComplete,
        setHasRequestError,
        setIsLoading,
      ),
    );
  };

  const handleModalButton = () => {
    setIsRequestComplete(false);

    if (!hasRequestError) {
      navigation.navigate({
        name: 'Consultation',
        params: {isBookingDone: true},
        merge: true,
      });
    }
  };
  return (
    <View style={styles.container}>
      {console.log(route.params)}
      <Text style={styles.title} category="h5">
        {route.params.appointment.type.toUpperCase()} CONSULTATION
      </Text>
      <View style={{...styles.tableContainer, ...styles.topMargin}}>
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
      <Button style={styles.topMargin} onPress={handleBookBtn}>
        BOOK APPOINTMENT
      </Button>

      <Modal visible={isRequestComplete}>
        <Card disabled={true} style={styles.modal}>
          <View style={styles.modalText}>
            <Text>{serverMessage}</Text>
          </View>
          <Button
            onPress={handleModalButton}
            style={styles.modalBtn}
            size="small">
            OK
          </Button>
        </Card>
      </Modal>

      <Modal visible={isLoading}>
        <Card disabled={true}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Card>
      </Modal>
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
    backgroundColor: 'white',
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
    color: 'green',
  },
  textPadding: {
    paddingVertical: 3,
  },
  topMargin: {
    marginTop: 10,
  },
  modal: {
    minHeight: 200,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 5,
  },
  modalText: {
    height: 150,
    justifyContent: 'center',
  },
});

export default BookingDetails;
