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
import MIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ModalView from '../ModalView';
import moment from 'moment';

const data = new Array(8).fill({
  title: 'Item',
});

import {getAppointmentsByStatus} from '../../../actions/appointmentActions';

const History = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [image, setImage] = useState();
  const vet = useSelector(state => state.auth.authVetData);
  const appointments = useSelector(state => state.appointment.appointmentsData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (vet) {
      setRefreshing(true);

      dispatch(
        getAppointmentsByStatus(
          {vet_id: vet.id, status: 'completed'},
          setRefreshing,
        ),
      );
    }
  }, [vet]);

  const changeImg = item => {
    if (item.user_img_name === null || item.user_img_name === '') {
      return 'http://petsmalu.xyz/images/default_avatar.gif';
    } else {
      return `http://petsmalu.xyz/uploads/${item.user_img_name}`;
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    dispatch(
      getAppointmentsByStatus(
        {vet_id: vet.id, status: 'completed'},
        setRefreshing,
      ),
    );
  }, []);

  const renderItem = ({item}) => (
    <View style={{...styles.card, ...styles.row}}>
      <Image
        style={styles.avatar}
        source={{
          uri: changeImg(item),
        }}
        onError={() =>
          setImage('http://petsmalu.xyz/images/default_avatar.gif')
        }
      />
      <View style={{flex: 1}}>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text category="h6" style={styles.name}>
              {item.user_name}
            </Text>
            <Text category="c1">Pet Owner</Text>
          </View>
          <View>
            <Text style={{color: '#32AF38'}}>Completed</Text>
          </View>
        </View>
        <Text style={{marginTop: 5}}>
          {item.type.charAt(0).toUpperCase() + item.type.slice(1)} Consultation
        </Text>
        <View style={{...styles.row}}>
          <Icon style={styles.icon} name="clock-o" color="#888" size={20} />
          <View style={{marginTop: 5}}>
            <Text category="p2">
              {moment(item.start_date).format('MMMM DD YYYY, dddd')}
            </Text>
            <Text category="p2">
              {moment(item.start_date).format('hh:mm A')} -{' '}
              {moment(item.end_date).format('hh:mm A')}
            </Text>
          </View>
        </View>
        <View style={{...styles.row, ...styles.btnContainer}}>
          <Button
            style={styles.detailBtn}
            size="small"
            onPress={() => {
              setVisible(true), setSelectedAppointment(item);
            }}>
            DETAILS
          </Button>
        </View>
      </View>
      <ModalView
        styles={styles}
        visible={visible}
        setVisible={setVisible}
        appointment={selectedAppointment}
      />
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../images/background.png')}
      style={{
        resizeMode: 'cover',
        flex: 1,
        padding: 10,
      }}>
      {appointments?.length > 0 ? (
        <List
          style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}}
          data={appointments}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    padding: 10,
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
  nameContainer: {flex: 1},
  icon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  detailBtn: {
    borderRadius: 50,
  },
  calendarBtn: {
    marginTop: 10,
  },
  btn: {
    borderRadius: 50,
    width: 150,
  },
  btnContainer: {
    marginTop: 10,
    justifyContent: 'space-between',
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
    maxWidth: 280,
  },
  nullMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default History;
