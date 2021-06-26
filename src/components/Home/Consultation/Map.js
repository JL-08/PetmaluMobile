import React, {useState, useEffect, memo, useCallback, useRef} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import {Text, Button} from '@ui-kitten/components';
import WalkInBookingForm from './WalkInBookingForm';

import {getAllVets} from '../../../actions/vetActions';
import MapMarker from './MapMarker';

const Map = ({navigation, setIsLoading}) => {
  const dispatch = useDispatch();
  const vetList = useSelector(state => state.vet.authData);
  const [position, setPosition] = useState();
  const [vetData, setVetData] = useState();
  const [isInMap, setIsInMap] = useState(true);
  const [isMapReady, setMapReady] = useState(false);

  const mapRef = useRef(null);

  const handleMapReady = useCallback(() => {
    setMapReady(true);
  }, [mapRef, setMapReady]);

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

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllVets(setIsLoading));
  }, []);

  return (
    <View>
      {!isInMap && (
        <WalkInBookingForm
          setIsInMap={setIsInMap}
          vetData={vetData}
          setVetData={setVetData}
          navigation={navigation}
          setIsLoading={setIsLoading}
        />
      )}

      {isInMap && (
        <>
          <MapView
            style={isMapReady ? styles.map : {}}
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            initialRegion={position}
            showsUserLocation={true}
            zoomControlEnabled
            showsMyLocationButton={true}
            onMapReady={handleMapReady}>
            {vetList &&
              vetList.map(vet => (
                <MapMarker
                  vet={vet}
                  key={vet.clinic_id}
                  setVetData={setVetData}
                />
              ))}
          </MapView>

          {vetData && (
            <View style={{...styles.row, ...styles.cardContainer}}>
              <Image
                style={{...styles.avatar, ...styles.rightMargin}}
                source={require('../../../images/avatar.gif')}
              />
              <View>
                <Text style={styles.vetName} category="h6">
                  {vetData.name}
                </Text>
                <Text category="s1">Doctor of Veterinary Medicine</Text>
                <View style={{...styles.row, marginTop: 10}}>
                  <Icon
                    style={styles.icon}
                    name="map-marker-alt"
                    size={20}
                    color="#555"
                  />
                  <View style={{maxWidth: '80%'}}>
                    <Text category="c1">{vetData.location}</Text>
                  </View>
                </View>
                <Button
                  style={{alignSelf: 'flex-start', marginTop: 8}}
                  size="small"
                  onPress={() => {
                    setIsInMap(false);
                    setMapReady(false);
                  }}>
                  BOOK APPOINTMENT
                </Button>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    minHeight: '65%',
    marginBottom: 5,
    flex: 1,
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
