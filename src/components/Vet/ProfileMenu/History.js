import React, {useState} from 'react';
import {View, StyleSheet, ImageBackground, Image} from 'react-native';
import {Text, List, Button} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import MIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import ModalView from '../ModalView';
import ContentTitle from '../ContentTitle';

const data = new Array(8).fill({
  title: 'Item',
});

const History = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const renderItem = info => (
    <View style={{...styles.card, ...styles.row}}>
      <Image
        style={styles.avatar}
        source={require('../../../images/avatar.gif')}
      />
      <View style={{flex: 1}}>
        <View style={styles.row}>
          <View style={styles.nameContainer}>
            <Text category="h6" style={styles.name}>
              Ian Benedict Pacelo
            </Text>
            <Text category="c1">Pet Owner</Text>
          </View>
          <View>
            <Text style={{color: '#32AF38'}}>Completed</Text>
          </View>
        </View>
        <Text style={{marginTop: 5}}>Online Consultation</Text>
        <View style={{...styles.row}}>
          <Icon style={styles.icon} name="clock-o" color="#888" size={20} />
          <View style={{marginTop: 5}}>
            <Text category="p2">June 11, 2021, Wednesday</Text>
            <Text category="p2">01:00 PM - 05:00 PM</Text>
          </View>
        </View>
        <View style={{...styles.row, ...styles.btnContainer}}>
          <Button
            style={styles.detailBtn}
            size="small"
            onPress={() => setVisible(true)}>
            DETAILS
          </Button>
        </View>
      </View>
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
      <List
        style={{backgroundColor: 'rgba(52, 52, 52, 0.0)'}}
        data={data}
        renderItem={renderItem}
      />
      <ModalView styles={styles} visible={visible} setVisible={setVisible} />
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
});
export default History;
