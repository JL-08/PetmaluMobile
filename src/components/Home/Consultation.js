import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Button, Card, Modal} from '@ui-kitten/components';

import ContentTitle from './ContentTitle';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import VetList from './Consultation/VetList';
import Map from './Consultation/Map';

const Consultation = ({navigation, route}) => {
  const [isInOnline, setIsInOnline] = useState(false);
  const [isInWalkIn, setIsInWalkIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInMap, setIsInMap] = useState(false);
  const [isInVetList, setIsInVetList] = useState(false);
  const [position, setPosition] = useState();

  useEffect(() => {
    if (route?.params?.isBookingDone) {
      route.params.isBookingDone = false;
      goToTypeSelection();
    }
  }, [route?.params?.isBookingDone]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
    );
  }, []);

  const goToTypeSelection = () => {
    setIsInOnline(false);
    setIsInWalkIn(false);
    setIsInMap(false);
    setIsInVetList(false);
  };

  return (
    <View style={styles.container}>
      {(isInVetList || isInMap) && (
        <TouchableOpacity
          style={{
            marginVertical: 10,
            marginLeft: 20,
            display: 'flex',
            flexDirection: 'row',
          }}
          onPress={() => goToTypeSelection()}>
          <Icon name="chevron-left" size={23} color="#999" />
          <Text style={{marginLeft: 5, color: '#444'}}>Back to Selection</Text>
        </TouchableOpacity>
      )}

      {!isInOnline && !isInWalkIn && (
        <View style={styles.center}>
          <ContentTitle title="Book an Appointment" />
          <View style={styles.btnContainer}>
            <Button
              style={styles.btn}
              onPress={() => {
                setIsInOnline(true);
                setIsInVetList(true);
              }}>
              ONLINE CONSULTATION
            </Button>
            <Button
              appearance="outline"
              onPress={() => {
                setIsInWalkIn(true);
                setIsInMap(true);
              }}>
              WALK-IN CONSULTATION
            </Button>
          </View>
        </View>
      )}

      {isInOnline && (
        <VetList
          navigation={navigation}
          setIsLoading={setIsLoading}
          isInList={isInVetList}
          setIsInList={setIsInVetList}
        />
      )}
      {isInWalkIn && (
        <Map
          navigation={navigation}
          setIsLoading={setIsLoading}
          isInMap={isInMap}
          setIsInMap={setIsInMap}
          position={position}
        />
      )}

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
