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

const PetForm = ({styleSheet, petFormData, setIsInPetForm, handleChange}) => {
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
        value={petFormData['pet_name']}
        style={styleSheet.input}
        textContentType="name"
        placeholder="Name"
        onChangeText={e => handleChange(e, 'pet_name', 'petRegister')}
      />
      <TextInput
        value={petFormData['age']}
        style={styleSheet.input}
        keyboardType="numeric"
        placeholder="Age"
        maxLength={2}
        onChangeText={e => handleChange(e, 'age', 'petRegister')}
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
          selectedValue={petFormData['type']}
          onValueChange={itemValue =>
            handleChange(itemValue, 'type', 'petRegister')
          }>
          <Picker.Item label="Dog" value="dog" />
          <Picker.Item label="Cat" value="cat" />
        </Picker>
      </View>
      <TextInput
        value={petFormData['breed']}
        style={styleSheet.breedInput}
        placeholder="Breed"
        onChangeText={e => handleChange(e, 'breed', 'petRegister')}
      />
      <TextInput
        value={petFormData['height']}
        style={styleSheet.input}
        keyboardType="numeric"
        placeholder="Height"
        maxLength={3}
        onChangeText={e => handleChange(e, 'height', 'petRegister')}
      />
      <TextInput
        value={petFormData['weight']}
        style={styleSheet.input}
        keyboardType="numeric"
        placeholder="Weight"
        maxLength={3}
        onChangeText={e => handleChange(e, 'weight', 'petRegister')}
      />
    </View>
  );
};

export default PetForm;
