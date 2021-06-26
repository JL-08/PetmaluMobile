import React from 'react';
import {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';

const MapMarker = ({vet, setVetData}) => {
  const MapIcon = () => <Icon name="map-marker-alt" size={20} />;

  return (
    <Marker
      title={vet.clinic_name}
      icon={MapIcon}
      coordinate={{
        latitude: parseFloat(vet.latitude),
        longitude: parseFloat(vet.longitude),
      }}
      onPress={() => setVetData(vet)}
    />
  );
};

export default MapMarker;
