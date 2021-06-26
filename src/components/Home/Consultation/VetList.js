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
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome';
import {default as TimePicker} from 'react-native-date-picker';
import moment from 'moment';

import {getAllVets} from '../../../actions/vetActions';
import {getAllUserPets} from '../../../actions/petActons';

const VetList = ({navigation, setIsLoading}) => {
  const [isInList, setIsInList] = useState(true);
  const [selectedVet, setSelectedVet] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [isEditingTime, setIsEditingTime] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.authData);
  const vetList = useSelector(state => state.vet.authData);
  const petList = useSelector(state => state.pet.petData);

  const CalendarIcon = props => <Icon {...props} name="calendar" />;

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllVets(setIsLoading));
  }, []);

  const handleBookBtn = info => {
    setIsLoading(true);
    setIsInList(false);
    setSelectedVet(info);
    dispatch(getAllUserPets(user.user_id, setIsLoading));
  };

  const renderItem = info => (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{marginRight: 15}}>
          <Image
            style={styles.avatar}
            source={require('../../../images/avatar.gif')}
          />
        </View>

        <View>
          <View style={styles.margin}>
            <Text style={styles.name} category="h6">
              Dr. {info.item.name}
              {console.log(info)}
            </Text>
            <Text category="s2">Doctor of Veterinary Medicine</Text>
          </View>
          <View style={styles.margin}>
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
          </View>
          {/* <TouchableOpacity style={styles.margin}>
            <Text style={styles.clinicText}>See Clinic</Text>
          </TouchableOpacity> */}
          <View style={{...styles.location, ...styles.margin}}>
            <Text>{info.item.location}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.center}>
              <FAIcon name="clock-o" color="#888" size={25} />
            </View>
            <View>
              <Text>Wed, Sat</Text>
              <Text>01:00PM - 06:00PMt</Text>
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
        />
      ) : (
        <View>
          <View
            style={{marginRight: 15, marginVertical: 10, flexDirection: 'row'}}>
            <Image
              style={styles.avatar2}
              source={require('../../../images/avatar.gif')}
            />
            <View style={styles.margin}>
              <Text style={styles.name} category="h6">
                Dr. {selectedVet.name}
              </Text>
              <Text category="s2">Doctor of Veterinary Medicine</Text>
            </View>
          </View>
          <Datepicker
            style={styles.margin}
            label="Date"
            placeholder="Pick Date"
            date={date}
            onSelect={nextDate => setDate(nextDate)}
            accessoryRight={CalendarIcon}
          />
          <Text style={{...styles.labelColor, fontSize: 12}}>Time</Text>
          <TouchableOpacity
            style={styles.timeTouch}
            onPress={() => setIsEditingTime(true)}>
            <Text style={styles.labelColor}>{moment(time).format('LT')}</Text>
          </TouchableOpacity>
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
            placeholder="Multiline"
          />
          <View style={styles.row}>
            <Button
              style={{flex: 1}}
              onPress={() =>
                navigation.push('Booking Details', {type: 'Online'})
              }>
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
            />
          </View>
          <Button onPress={() => setIsEditingTime(false)} size="small">
            OK
          </Button>
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
  location: {
    maxWidth: '80%',
  },
  timeTouch: {
    backgroundColor: '#F7F9FC',
    padding: 10,
    marginBottom: 10,
  },
  labelColor: {
    color: '#777',
  },
});

export default VetList;
