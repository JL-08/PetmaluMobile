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
import {launchImageLibrary} from 'react-native-image-picker';

import {createAppointment} from '../../../actions/appointmentActions';

const BookingDetails = ({route, navigation}) => {
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState();
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
        fileBase64,
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

  const truncateString = (str, num) => {
    if (str === '') {
      return 'none';
    }

    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
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
      {/* <Text category="p2" style={{color: '#555', ...styles.topMargin}}>
        NOTE: Booking fee will be completely refunded if the veterinarian
        cancels or does not accept your appointments after 24hours of booking.
      </Text> */}
      <Text style={styles.topMargin}>
        Follow the steps below in order to proceed with your booking.
      </Text>
      <Text>1. Go to your GCash app</Text>
      <Text>2. Send Money to 09459436257</Text>
      <Text>3. Download the receipt upon successful payment</Text>
      <Text>4. Use the button below to upload the receipt</Text>
      <Text>5. Press the BOOK APPOINTMENT button</Text>
      <Text
        style={{color: '#9BA6BA', marginBottom: 5, marginTop: 10}}
        category="label">
        Upload your receipt
      </Text>
      <Button
        style={{...styles.uploadBtn, ...styles.btmargin}}
        appearance="outline"
        status="basic"
        accessoryLeft={() => <Icon name="upload" color="gray" />}
        onPress={() =>
          launchImageLibrary({mediaType: 'photo', includeBase64: true}, res => {
            if (res.didCancel) {
              console.log('User cancelled image picker');
            } else if (res.error) {
              console.log('ImagePicker Error: ', res.error);
            } else {
              setFileName(res.assets[0].fileName);
              setFileBase64(res.assets[0].base64);
            }
          })
        }>
        {fileName
          ? `uploaded: ${truncateString(fileName, 30)}`
          : 'Upload Receipt'}
      </Button>
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
            appearance="ghost"
            status="basic">
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
  modalBtn: {
    alignSelf: 'flex-end',
  },
});

export default BookingDetails;
