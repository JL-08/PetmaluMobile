import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
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
} from '@ui-kitten/components';

const WalkInBookingForm = ({setIsInMap, setVetData, navigation}) => {
  const [date, setDate] = React.useState(new Date());
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const CalendarIcon = props => <Icon {...props} name="calendar" />;

  return (
    <View>
      <View style={{marginRight: 15, marginVertical: 10, flexDirection: 'row'}}>
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
        onPress={() => navigation.push('BookingDetails', {type: 'Walk-In'})}>
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
});

export default WalkInBookingForm;
