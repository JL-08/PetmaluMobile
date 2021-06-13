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
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome';

const data = new Array(8).fill({
  title: 'Item',
});

const VetList = ({navigation}) => {
  const [isInList, setIsInList] = useState(true);
  const [selectedItem, setSelectedItem] = useState({});
  const [date, setDate] = React.useState(new Date());
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const CalendarIcon = props => <Icon {...props} name="calendar" />;

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
              Dr. Shan Valdez
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
          <TouchableOpacity style={styles.margin}>
            <Text style={styles.clinicText}>See Clinic</Text>
          </TouchableOpacity>
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
            onPress={() => {
              setIsInList(false);
              setSelectedItem(info);
            }}
            style={styles.btn}
            size="small">
            BOOK APPOINTMENT
          </Button>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      {isInList ? (
        <List
          contentContainerStyle={styles.contentContainer}
          data={data}
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
                Dr. Shan Valdez
              </Text>
              <Text category="s2">Doctor of Veterinary Medicine</Text>
            </View>
          </View>
          <Datepicker
            label="Date"
            placeholder="Pick Date"
            date={date}
            onSelect={nextDate => setDate(nextDate)}
            accessoryRight={CalendarIcon}
          />
          <Select
            label="Select Pet"
            selectedIndex={selectedIndex}
            onSelect={index => setSelectedIndex(index)}>
            <SelectItem title="Option 1" />
            <SelectItem title="Option 2" />
            <SelectItem title="Option 3" />
          </Select>
          <Input
            label="Reason of Consultation"
            multiline={true}
            textStyle={{minHeight: 64}}
            placeholder="Multiline"
          />
          <Button
            onPress={() =>
              navigation.push('Booking Details', {type: 'Online'})
            }>
            CONTINUE
          </Button>
          <Button onPress={() => setIsInList(true)} appearance="ghost">
            CANCEL
          </Button>
        </View>
      )}
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
    alignSelf: 'center',
    borderRadius: 50,
  },
});

export default VetList;
