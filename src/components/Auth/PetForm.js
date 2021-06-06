import React, {useState} from 'react';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {Picker} from '@react-native-picker/picker';

const PetForm = ({styleSheet, setIsInPetForm}) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View>
      <TouchableOpacity
        style={{marginBottom: 10, display: 'flex', flexDirection: 'row'}}
        onPress={() => setIsInPetForm(false)}>
        <Icon name="chevron-left" size={23} color="#222" />
        <Text style={{marginLeft: 5}}>Back</Text>
      </TouchableOpacity>
      <Text style={styleSheet.heading}>Pet Details</Text>
      <TextInput
        style={styleSheet.input}
        textContentType="name"
        placeholder="Name"
      />
      <TextInput
        style={styleSheet.input}
        keyboardType="numeric"
        placeholder="Age"
      />
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#808080', marginRight: 5}}>Type</Text>
        <Picker
          style={{
            margin: 0,
            padding: 0,
            flex: 1,
            color: '#808080',
          }}
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
          <Picker.Item label="Dog" value="dog" />
          <Picker.Item label="Cat" value="cat" />
        </Picker>
      </View>
      <TextInput style={styleSheet.breedInput} placeholder="Breed" />
      <TextInput
        style={styleSheet.input}
        keyboardType="numeric"
        placeholder="Height"
      />
      <TextInput
        style={styleSheet.input}
        keyboardType="numeric"
        placeholder="Weight"
      />
    </View>
  );
};

export default PetForm;
