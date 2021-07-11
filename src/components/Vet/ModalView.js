import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Button, Card, Modal, Text} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import moment from 'moment';

const ModalView = ({styles, visible, setVisible, appointment}) => {
  const changeImg = item => {
    if (item.user_img_name === null || item.user_img_name === '') {
      return 'http://petsmalu.xyz/images/default_avatar.gif';
    } else {
      return `http://petsmalu.xyz/uploads/${item.user_img_name}`;
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
            {/* {console.log(appointment)} */}
            <View>
              <Text category="h6" style={styles.name}>
                {appointment?.user_name}
              </Text>
              <Text category="c1">Pet Owner</Text>
            </View>
            <Text category="s1" style={{...modalStyles.bold, marginTop: 20}}>
              {appointment?.type.charAt(0).toUpperCase() +
                appointment?.type.slice(1)}{' '}
              Consultation
            </Text>
            <View style={styles.row}>
              <Icon style={styles.icon} name="clock-o" color="#888" size={20} />
              <View style={{marginTop: 5}}>
                <Text category="p1">
                  {moment(appointment?.start_date).format('MMMM DD YYYY, dddd')}
                </Text>
                <Text category="p1">
                  {moment(appointment?.start_date).format('hh:mm A')}
                </Text>
              </View>
            </View>
            <View style={modalStyles.topMargin}>
              <Text category="s1" style={modalStyles.bold}>
                Chief of complain
              </Text>
              <Text category="p1">{appointment?.reason}</Text>
            </View>
            <View style={modalStyles.topMargin}>
              <Text category="h6" style={modalStyles.bold}>
                Pet Details
              </Text>
              <View style={modalStyles.row}>
                <View style={modalStyles.rightMargin}>
                  <Text category="p1">Name:</Text>
                  <Text category="p1">Age:</Text>
                  <Text category="p1">Type:</Text>
                  <Text category="p1">Breed:</Text>
                  <Text category="p1">Height:</Text>
                  <Text category="p1">Weight:</Text>
                </View>
                <View>
                  <Text category="p1">{appointment?.pet_name}</Text>
                  <Text category="p1">{appointment?.pet_age}</Text>
                  <Text category="p1">
                    {appointment?.pet_type.charAt(0).toUpperCase() +
                      appointment?.pet_type.slice(1)}
                  </Text>
                  <Text category="p1">{appointment?.pet_breed}</Text>
                  <Text category="p1">{appointment?.pet_height} inches</Text>
                  <Text category="p1">{appointment?.pet_weight} kg</Text>
                </View>
              </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
