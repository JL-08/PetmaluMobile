import {Button} from '@ui-kitten/components';
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import ContentTitle from './ContentTitle';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import VetList from './Consultation/VetList';
import Map from './Consultation/Map';

const Consultation = ({navigation}) => {
  const [isInOnline, setIsInOnline] = useState(false);
  const [isInWalkIn, setIsInWalkIn] = useState(false);

  return (
    <View style={styles.container}>
      {(isInOnline || isInWalkIn) && (
        <TouchableOpacity
          style={{
            marginVertical: 10,
            marginLeft: 20,
            display: 'flex',
            flexDirection: 'row',
          }}
          onPress={() => {
            setIsInOnline(false);
            setIsInWalkIn(false);
          }}>
          <Icon name="chevron-left" size={23} color="#999" />
          <Text style={{marginLeft: 5, color: '#444'}}>Back to Selection</Text>
        </TouchableOpacity>
      )}

      {!isInOnline && !isInWalkIn && (
        <View style={styles.center}>
          <ContentTitle title="Book an Appointment" />
          <View style={styles.btnContainer}>
            <Button style={styles.btn} onPress={() => setIsInOnline(true)}>
              ONLINE CONSULTATION
            </Button>
            <Button appearance="outline" onPress={() => setIsInWalkIn(true)}>
              WALK-IN CONSULTATION
            </Button>
          </View>
        </View>
      )}

      {isInOnline && <VetList navigation={navigation} />}
      {isInWalkIn && <Map navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  btnContainer: {
    alignSelf: 'center',
  },
  btn: {
    marginBottom: 10,
  },
  center: {
    justifyContent: 'center',
    flex: 1,
    marginTop: -50,
  },
});
export default Consultation;
