import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Divider, Drawer, DrawerItem, Icon} from '@ui-kitten/components';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome';

const PersonIcon = props => <Icon {...props} name="person-outline" />;

const PhoneIcon = props => <Icon {...props} name="phone-call-outline" />;

const ForwardIcon = props => <Icon {...props} name="arrow-ios-forward" />;

const AboutIcon = props => <Icon {...props} name="info-outline" />;

const ClockIcon = props => <Icon {...props} name="clock-outline" />;

const PetIcon = props => (
  <FAIcon
    {...props}
    style={{paddingLeft: 8, paddingRight: 10}}
    size={20}
    name="paw"
    color="#B7BFCE"
  />
);

const Menu = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  return (
    <Drawer
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <DrawerItem
        title="My Profile"
        accessoryLeft={PersonIcon}
        accessoryRight={ForwardIcon}
        onPress={() => navigation.push('My Profile')}
      />
      <DrawerItem
        title="My Pets"
        accessoryLeft={PetIcon}
        accessoryRight={ForwardIcon}
        onPress={() => navigation.push('My Pets')}
      />
      <DrawerItem
        title="My Appointments"
        accessoryLeft={ClockIcon}
        accessoryRight={ForwardIcon}
        onPress={() => navigation.push('Appointments')}
      />
      <DrawerItem
        title="Contact Us"
        accessoryLeft={PhoneIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title="About Us"
        accessoryLeft={AboutIcon}
        accessoryRight={ForwardIcon}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Menu;
