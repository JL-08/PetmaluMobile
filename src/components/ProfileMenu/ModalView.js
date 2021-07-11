import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Card, Modal, Text} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import moment from 'moment';

const ModalView = ({styles, visible, setVisible, appointment}) => {
  const changeImg = item => {
    if (item.vet_img_name === null || item.vet_img_name === '') {
      return 'http://petsmalu.xyz/images/default_avatar.gif';
    } else {
      return `http://petsmalu.xyz/uploads/${item.vet_img_name}`;
    }
  };

  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={modalStyles.backdrop}
        onBackdropPress={() => setVisible(false)}
        style={modalStyles.modal}>
        <Card disabled={true}>
          <Image
            style={styles.avatar}
            source={{
              uri: appointment && changeImg(appointment),
            }}
          />
          <View>
            <View>
              <Text category="h6" style={styles.name}>
                Dr. {appointment.vet_name}
              </Text>
              <Text category="c1">Doctor of Veterinary Medicine</Text>
            </View>
            <Text category="s1" style={{...modalStyles.bold, marginTop: 20}}>
              {appointment &&
                appointment.type.charAt(0).toUpperCase() +
                  appointment.type.slice(1)}{' '}
              Consultation
            </Text>
            <View style={styles.row}>
              <Icon style={styles.icon} name="clock-o" color="#888" size={20} />
              <View style={{marginTop: 5}}>
                <Text category="p1">
                  {moment(appointment.start_date).format('MMMM DD YYYY, dddd')}
                </Text>
                <Text category="p1">
                  {moment(appointment.start_date).format('hh:mm A')} -{' '}
                  {moment(appointment.end_date).format('hh:mm A')}
                </Text>
              </View>
            </View>
            <View style={modalStyles.topMargin}>
              <Text category="s1" style={modalStyles.bold}>
                Chief of complain
              </Text>
              <Text category="p1">{appointment.reason}</Text>
            </View>
            <View style={modalStyles.topMargin}>
              <Text category="s1" style={modalStyles.bold}>
                Status
              </Text>
              <View style={modalStyles.row}>
                <View style={modalStyles.rightMargin}>
                  <Text category="p1">Payment</Text>
                  <Text category="p1">Appointment</Text>
                </View>
                <View>
                  <Text category="p1">Completed</Text>
                  <Text category="p1">
                    {appointment &&
                      appointment.status.charAt(0).toUpperCase() +
                        appointment.status.slice(1)}
                  </Text>
                </View>
              </View>
            </View>
            <View style={modalStyles.topMargin}>
              <View style={{...modalStyles.row, alignItems: 'center'}}>
                <Text category="s1" style={modalStyles.bold}>
                  Consultation Link
                </Text>
                <Button
                  appearance="ghost"
                  size="tiny"
                  style={modalStyles.copyBtn}>
                  COPY
                </Button>
              </View>
              <Text
                category="p1"
                style={appointment.meeting_link ? modalStyles.link : ''}>
                {appointment.meeting_link || 'N/A'}
              </Text>
            </View>
            <Button
              style={modalStyles.btn}
              size="small"
              onPress={() => setVisible(false)}>
              CLOSE
            </Button>
          </View>
        </Card>
      </Modal>
    </>
  );
};

const modalStyles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    minWidth: '80%',
    maxHeight: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
  rightMargin: {
    marginRight: 50,
  },
  topMargin: {
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
  },
  copyBtn: {
    color: 'black',
    marginLeft: 10,
  },
});
export default ModalView;
