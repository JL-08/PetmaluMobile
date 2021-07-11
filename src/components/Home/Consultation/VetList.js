import {
  Button,
  Text,
  List,
  Datepicker,
  Icon,
  Select,
  SelectItem,
  Input,
  Modal,
  Card,
} from '@ui-kitten/components';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome';
import {default as TimePicker} from 'react-native-date-picker';
import moment from 'moment';

import {getAllVets} from '../../../actions/vetActions';
import {getAllUserPets} from '../../../actions/petActons';
import {checkAppointmentValidity} from '../../../actions/appointmentActions';

const VetList = ({navigation, setIsLoadingCopy, isInList, setIsInList}) => {
  //const [isBookingDone, setIsBookingDone] = useState(false);
  const [selectedVet, setSelectedVet] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [duration, setDuration] = useState();
  const [selectedDurationUnit, setSelectedDurationUnit] = useState(0);
  const [reason, setReason] = useState();
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [hasRequestError, setHasRequestError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.authData);
  const vetList = useSelector(state => state.vet.authData);
  const petList = useSelector(state => state.pet.petData);

  const CalendarIcon = props => <Icon {...props} name="calendar" />;

  const ClockIcon = props => <Icon {...props} name="clock-outline" />;

  const DurationUnit = () => (
    <Select
      style={{width: '31%'}}
      onSelect={index => setSelectedDurationUnit(index.row)}
      value={selectedDurationUnit === 0 ? 'mins' : 'hrs'}>
      <SelectItem title="mins" />
      <SelectItem title="hrs" />
    </Select>
  );

  useEffect(() => {
    setRefreshing(true);
    dispatch(getAllVets(setRefreshing));
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getAllVets(setRefreshing));
  }, []);

  const handleBookBtn = info => {
    setIsLoading(true);
    setIsInList(false);
    setSelectedVet(info);
    dispatch(getAllUserPets(user.user_id, setIsLoading));
  };

  const calculateEndDate = () => {
    const selectedDate = `${moment(date).format('YYYY-MM-DD')} ${moment(
      time,
    ).format('kk:mm')}`;

    if (selectedDurationUnit === 0) {
      return moment(selectedDate, 'YYYY-MM-DD kk:mm')
        .add(duration, 'minutes')
        .format('YYYY-MM-DD kk:mm');
    } else {
      return moment(selectedDate, 'YYYY-MM-DD kk:mm')
        .add(duration, 'hours')
        .format('YYYY-MM-DD kk:mm');
    }
  };

  const handleContinue = () => {
    setIsLoading(true);

    const appointment = {
      type: 'online',
      vet: selectedVet.id,
      user: user.user_id,
      date: `${moment(date).format('YYYY-MM-DD')} ${moment(time).format(
        'kk:mm',
      )}`,
      end_date: calculateEndDate(),
      pet: petList[selectedIndex].id,
      reason,
    };

    dispatch(
      checkAppointmentValidity(
        appointment,
        setServerMessage,
        setIsRequestComplete,
        setHasRequestError,
        setIsLoading,
        navigation,
      ),
    );
  };

  const handleModalButton = () => {
    setIsRequestComplete(false);
  };

  const changeImg = item => {
    if (item.img_name === null || item.img_name === '') {
      return 'http://petsmalu.xyz/images/default_avatar.gif';
    } else {
      return `http://petsmalu.xyz/uploads/${item.img_name}`;
    }
  };

  const renderItem = info => (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{marginRight: 15}}>
          <Image
            style={styles.avatar}
            source={{
              uri: changeImg(info.item),
            }}
          />
        </View>

        <View>
          <View style={styles.margin}>
            <Text style={styles.name} category="h6">
              Dr. {info.item.name}
            </Text>
            <Text category="s2">Doctor of Veterinary Medicine</Text>
          </View>
          {/* <View style={styles.margin}>
            <View style={styles.row}>
              <FAIcon
                style={styles.icon}
                name="check"
                color="green"
                size={15}
              />
              <Text category="p1">Face-to-face consultation</Text>
            </View>
            <View style={styles.row}>
              <FAIcon
                style={styles.icon}
                name="check"
                color="green"
                size={15}
              />
              <Text category="p1">Online consultation</Text>
            </View>
          </View> */}
          {/* <TouchableOpacity style={styles.margin}>
            <Text style={styles.clinicText}>See Clinic</Text>
          </TouchableOpacity> */}
          <View
            style={{
              ...styles.textWidth,
              ...styles.margin,
              flexDirection: 'row',
            }}>
            <View style={{...styles.center, marginRight: 15}}>
              <FAIcon name="map-marker" color="#888" size={28} />
            </View>
            <Text>{info.item.location}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.center}>
              <FAIcon name="clock-o" color="#888" size={25} />
            </View>
            <View style={styles.textWidth}>
              <Text>{info.item.availability_day}</Text>
              <Text>{info.item.availability_time}</Text>
            </View>
          </View>
          <Button
            onPress={() => handleBookBtn(info.item)}
            style={styles.btn}
            size="small">
            BOOK APPOINTMENT
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{paddingBottom: 20}}>
      {isInList ? (
        <List
          contentContainerStyle={styles.contentContainer}
          data={vetList}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View>
          <View
            style={{marginRight: 15, marginVertical: 10, flexDirection: 'row'}}>
            <Image
              style={styles.avatar2}
              source={{
                uri: changeImg(selectedVet),
              }}
            />
            <View style={styles.margin}>
              <Text style={styles.name} category="h6">
                Dr. {selectedVet.name}
              </Text>
              <Text category="s2">Doctor of Veterinary Medicine</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Datepicker
              style={{...styles.margin, flex: 1, marginRight: 5}}
              label="Date"
              placeholder="Pick Date"
              date={date}
              onSelect={nextDate => setDate(nextDate)}
              min={new Date()}
              // accessoryRight={CalendarIcon}
            />
            <View style={{flex: 1, marginTop: 4}}>
              <Text style={{...styles.labelColor, fontSize: 12}}>Time</Text>
              <TouchableOpacity
                style={styles.timeTouch}
                onPress={() => setIsEditingTime(true)}>
                <Text style={styles.labelColor}>
                  {moment(time).format('LT')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Input
            style={styles.margin}
            value={duration}
            label="Duration"
            keyboardType="number-pad"
            accessoryRight={DurationUnit}
            onChangeText={e => setDuration(e)}
          />
          <Select
            style={styles.margin}
            label="Select Pet"
            onSelect={index => setSelectedIndex(index.row)}
            value={petList ? petList[selectedIndex].name : '--'}>
            {petList &&
              petList.map(pet => <SelectItem title={pet.name} key={pet.id} />)}
          </Select>
          <Input
            style={styles.margin}
            label="Reason of Consultation"
            multiline={true}
            textStyle={{minHeight: 64}}
            value={reason}
            onChangeText={e => setReason(e)}
          />
          <View style={styles.row}>
            <Button style={{flex: 1}} onPress={handleContinue}>
              CONTINUE
            </Button>
            <Button onPress={() => setIsInList(true)} appearance="ghost">
              CANCEL
            </Button>
          </View>
        </View>
      )}
      <Modal visible={isEditingTime}>
        <Card disabled={true}>
          <View>
            <TimePicker
              date={time}
              mode="time"
              onDateChange={e => setTime(e)}
              minuteInterval={5}
            />
          </View>
          <Button onPress={() => setIsEditingTime(false)} size="small">
            OK
          </Button>
        </Card>
      </Modal>

      <Modal visible={isRequestComplete}>
        <Card disabled={true} style={styles.modal}>
          <View style={styles.modalText}>
            <Text>{serverMessage}</Text>
          </View>
          <Button
            onPress={handleModalButton}
            style={styles.modalBtn}
            status="basic"
            appearance="ghost">
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
  container: {
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 30,
    padding: 20,
    marginVertical: 5,
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  avatar2: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
  },
  margin: {
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  clinicText: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center',
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
    alignSelf: 'center',
  },
  btn: {
    marginTop: 20,
    alignSelf: 'flex-start',
    borderRadius: 50,
  },
  textWidth: {
    maxWidth: '80%',
  },
  timeTouch: {
    backgroundColor: '#F7F9FC',
    padding: 10,
  },
  labelColor: {
    color: '#A3ADC1',
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

export default VetList;
