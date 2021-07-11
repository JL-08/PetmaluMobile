import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Text, List, Button, Modal, Card} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ModalView from './ModalView';

import moment from 'moment';
import {getAllUserAppointments} from '../../actions/appointmentActions';

const Appointments = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.authData);
  const appointmentList = useSelector(
    state => state.appointment.appointmentData,
  );

  useEffect(() => {
    setRefreshing(true);
    dispatch(getAllUserAppointments(user.user_id, setRefreshing));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllUserAppointments(user.user_id, setRefreshing));
  }, []);

  const changeImg = item => {
    if (item.vet_img_name === null || item.vet_img_name === '') {
      return 'http://petsmalu.xyz/images/default_avatar.gif';
    } else {
      return `http://petsmalu.xyz/uploads/${item.vet_img_name}`;
    }
  };

  const renderItem = info => (
    <View style={{...styles.card, ...styles.row}}>
      <Image
        style={styles.avatar}
        source={{
          uri: changeImg(info.item),
        }}
      />
      <View>
        <View>
          <Text category="h6" style={styles.name}>
            Dr. {info.item.vet_name}
          </Text>
          <Text category="c1">Doctor of Veterinary Medicine</Text>
        </View>
        <Text style={{marginTop: 5}}>
          {info.item.type.charAt(0).toUpperCase() + info.item.type.slice(1)}{' '}
          Consultation
        </Text>
        <View style={{...styles.row}}>
          <Icon style={styles.icon} name="clock-o" color="#888" size={20} />
          <View style={{marginTop: 5}}>
            <Text category="p2">
              {moment(info.item.start_date).format('MMMM DD YYYY, dddd')}
            </Text>
            <Text category="p2">
              {moment(info.item.start_date).format('hh:mm A')} -{' '}
              {moment(info.item.end_date).format('hh:mm A')}
            </Text>
          </View>
        </View>
        <Button
          style={styles.btn}
          size="small"
          onPress={() => {
            setVisible(true);
            setSelectedAppointment(info.item);
          }}>
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
      {/* <Text style={{color: '#555'}} category="p1">
        Note: Booking fee will be completely refuned if the veterinarian cancels
        or did not approve your appointment after 24 hours of booking
      </Text> */}
      <Button
        style={styles.calendarBtn}
        appearance="outline"
        size="small"
        accessoryLeft={props => (
          <Icon size={20} name="calendar" color="#7068DE" />
        )}
        onPress={() =>
          navigation.navigate('Calendar', {
            appointmentList,
          })
        }>
        CHECK CALENDAR
      </Button>
      {appointmentList ? (
        <List
          style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}}
          data={appointmentList}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={styles.nullMessageContainer}>
          <Text>Nothing to display here...</Text>
        </View>
      )}

      <ModalView
        styles={styles}
        visible={visible}
        setVisible={setVisible}
        appointment={selectedAppointment}
      />

      <Modal visible={isLoading}>
        <Card disabled={true}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Card>
      </Modal>
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
  nullMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Appointments;
