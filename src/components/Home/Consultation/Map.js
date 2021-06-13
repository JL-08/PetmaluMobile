import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {Text, Button} from '@ui-kitten/components';

const Map = () => {
  const [position, setPosition] = useState({
    latitude: 10,
    longitude: 10,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [vetData, setVetData] = useState();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
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
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const MapIcon = () => <Icon name="map-marker-alt" size={20} />;

  return (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={position}
        showsUserLocation={true}
        showsMyLocationButton={true}>
        <Marker
          title="Clinic 1"
          icon={MapIcon}
          coordinate={{
            latitude: position.latitude,
            longitude: position.longitude + 0.0004,
          }}
          onPress={() => setVetData('Vet 1')}
        />

        <Marker
          title="Clinic 2"
          icon={MapIcon}
          coordinate={{
            latitude: position.latitude + 0.0004,
            longitude: position.longitude,
          }}
          onPress={() => setVetData('Vet 2')}
        />
      </MapView>
      {vetData && (
        <View style={{...styles.row, ...styles.cardContainer}}>
          <Image
            style={{...styles.avatar, ...styles.rightMargin}}
            source={require('../../../images/avatar.gif')}
          />
          <View>
            <Text style={styles.vetName} category="h6">
              {vetData}
            </Text>
            <Text category="s1">Doctor of Veterinary Medicine</Text>
            <View style={{...styles.row, marginTop: 10}}>
              <Icon
                style={styles.icon}
                name="map-marker-alt"
                size={20}
                color="#555"
              />
              <View>
                <Text category="c1">Unit 70, 7th floor, Medical Condo</Text>
                <Text category="c1">Clinic Medicus Medical Center</Text>
              </View>
            </View>
            <Button style={{alignSelf: 'center'}} size="small">
              BOOK NOW
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    minHeight: '65%',
    marginBottom: 5,
  },
  vetName: {
    fontWeight: 'bold',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  rightMargin: {
    marginRight: 10,
  },
  cardContainer: {
    borderRadius: 20,
    borderWidth: 1,
    alignContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
});
export default Map;
