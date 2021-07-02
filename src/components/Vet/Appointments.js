import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  ActivityIndicator,
  Linking,
  RefreshControl,
} from 'react-native';
import {Text, List, Button, Modal, Card} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import ModalView from './ModalView';
import ContentTitle from './ContentTitle';
import MIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';

import moment from 'moment';

import {
  getAppointmentsByStatus,
  updateAppointmentStatus,
} from '../../actions/appointmentActions';

const Appointments = ({navigation}) => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [showPrompt, setShowPrompt] = useState(false);
  const vet = useSelector(state => state.auth.authVetData);
  const appointments = useSelector(state => state.appointment.appointmentsData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (vet) {
      setRefreshing(true);

      dispatch(
        getAppointmentsByStatus(
          {vet_id: vet.id, status: 'approved'},
          setRefreshing,
        ),
      );
    }
  }, [vet]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    dispatch(
      getAppointmentsByStatus(
        {vet_id: vet.id, status: 'approved'},
        setRefreshing,
      ),
    );
  }, []);

  const handleProceedToBrowser = () => {
    Linking.openURL('https://google.com');
  };

  const handleRejectBtn = () => {
    setServerMessage('Are you sure you want to reject this appointment?');
    setShowPrompt(true);
  };

  const handleModalButton = () => {
    setIsRequestComplete(false);

    setIsLoading(true);
    dispatch(
      getAppointmentsByStatus(
        {vet_id: vet.id, status: 'pending'},
        setIsLoading,
      ),
    );
  };

  const handlePrompt = (appointment_id, status) => {
    if (status === 'reject') {
      setShowPrompt(false);
      setIsLoading(true);

      dispatch(
        updateAppointmentStatus(
          {appointment_id, status: 'rejected'},
          setServerMessage,
          setIsRequestComplete,
          setIsLoading,
        ),
      );
    } else {
      setShowPrompt(false);
    }
  };

  const renderItem = ({item}) => (
    <View style={{...styles.card, ...styles.row}}>
      <Image
        style={styles.avatar}
        source={require('../../images/avatar.gif')}
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
            <Button
              style={styles.detailBtn}
              size="tiny"
              onPress={() => {
                setVisible(true);
                setSelectedAppointment(item);
              }}
              appearance="outline"
              status="basic">
              <MIcons name="account-details" size={15} color="black" />
            </Button>
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
              {moment(item.start_date).format('hh:mm A')}
            </Text>
          </View>
        </View>
        <View style={{...styles.row, ...styles.btnContainer}}>
          <Button
            style={styles.btn}
            size="small"
            status="success"
            onPress={() => handleProceedToBrowser(item.id)}>
            PROCEED
          </Button>
        </View>
      </View>

      <Modal visible={showPrompt}>
        <Card disabled={true} style={styles.modal}>
          <View style={styles.modalText}>
            <Text>{serverMessage}</Text>
          </View>
          <View style={{...styles.row, justifyContent: 'flex-end'}}>
            <Button
              onPress={() => handlePrompt(item.id, 'reject')}
              style={styles.modalBtn}
              status="danger"
              appearance="ghost">
              REJECT
            </Button>
            <Button
              onPress={() => handlePrompt(item.id, 'cancel')}
              style={styles.modalBtn}
              status="basic"
              appearance="ghost">
              CANCEL
            </Button>
          </View>
        </Card>
      </Modal>

      <Modal visible={isLoading}>
        <Card disabled={true}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Card>
      </Modal>
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
      <ContentTitle title="Appointment List" />
      {/* <Button
        style={styles.calendarBtn}
        appearance="outline"
        size="small"
        accessoryLeft={props => (
          <Icon size={20} name="calendar" color="#7068DE" />
        )}
        onPress={() => navigation.push('Calendar')}>
        CHECK CALENDAR
      </Button> */}
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
      <ModalView
        styles={styles}
        visible={visible}
        setVisible={setVisible}
        appointment={selectedAppointment}
      />
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
    width: '90%',
  },
  btnContainer: {
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
    maxWidth: 280,
  },
  nullMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Appointments;
