import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome';
import {
  Button,
  Text,
  List,
  Datepicker,
  Icon,
  IndexPath,
  Select,
  SelectItem,
  Input,
  Modal,
  Card,
} from '@ui-kitten/components';
import {default as TimePicker} from 'react-native-date-picker';
import moment from 'moment';

import {getAllUserPets} from '../../../actions/petActons';
import {checkAppointmentValidity} from '../../../actions/appointmentActions';

const WalkInBookingForm = ({setIsInMap, vetData, setVetData, navigation}) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [reason, setReason] = useState();
  const [duration, setDuration] = useState();
  const [selectedDurationUnit, setSelectedDurationUnit] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [hasRequestError, setHasRequestError] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.authData);
  const pets = useSelector(state => state.pet.petData);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllUserPets(user.user_id, setIsLoading));
  }, []);

  const CalendarIcon = props => <Icon {...props} name="calendar" />;

  const DurationUnit = () => (
    <Select
      style={{width: '31%'}}
      onSelect={index => setSelectedDurationUnit(index.row)}
      value={selectedDurationUnit === 0 ? 'mins' : 'hrs'}>
      <SelectItem title="mins" />
      <SelectItem title="hrs" />
    </Select>
  );

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
      type: 'walk-in',
      vet: vetData.id,
      user: user.user_id,
      date: `${moment(date).format('YYYY-MM-DD')} ${moment(time).format(
        'kk:mm',
      )}`,
      end_date: calculateEndDate(),
      pet: pets[selectedIndex].id,
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

  return (
    <View>
      <View style={{marginRight: 15, marginVertical: 10, flexDirection: 'row'}}>
        <Image
          style={styles.avatar2}
          source={{
            uri: changeImg(vetData),
          }}
        />
        <View style={styles.margin}>
          <Text style={styles.name} category="h6">
            Dr. {vetData.name}
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
            <Text style={styles.labelColor}>{moment(time).format('LT')}</Text>
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
        value={pets ? pets[selectedIndex].name : '--'}>
        {pets && pets.map(pet => <SelectItem title={pet.name} key={pet.id} />)}
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
        <Button
          onPress={() => {
            setIsInMap(true);
            setVetData();
          }}
          appearance="ghost">
          CANCEL
        </Button>
      </View>

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
          <Button onPress={() => setIsEditingTime(false)} appearance="ghost">
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
  avatar2: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  margin: {
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
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

export default WalkInBookingForm;
