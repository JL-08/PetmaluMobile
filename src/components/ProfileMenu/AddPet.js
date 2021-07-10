import React, {useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Text,
  Input,
  Select,
  SelectItem,
  IndexPath,
  Button,
  Modal,
  Card,
} from '@ui-kitten/components';

const typeData = ['Dog', 'Cat'];
const initialData = {
  name: '',
  age: '',
  type: 'dog',
  breed: '',
  height: '',
  weight: '',
};

import {registerPet} from '../../actions/petActons';

const AddPet = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [petForm, setPetForm] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [hasRequestError, setHasRequestError] = useState(false);
  const displayValue = typeData[selectedIndex.row];
  const user = useSelector(state => state.auth.authData);
  const dispatch = useDispatch();

  const handleChange = (e, name) => {
    setPetForm({...petForm, [name]: e});
  };

  const handleSubmit = () => {
    setIsLoading(true);
    dispatch(
      registerPet(
        {
          ...petForm,
          type: typeData[selectedIndex].toLowerCase(),
          user_id: user.user_id,
        },
        setServerMessage,
        setIsRequestComplete,
        setHasRequestError,
        setIsLoading,
      ),
    );
  };

  const handleModalButton = () => {
    setIsRequestComplete(false);

    if (!hasRequestError) {
      setPetForm(initialData);

      navigation.navigate({
        name: 'My Pets',
        params: {isActionDone: true},
        merge: true,
      });
    }
  };

  const renderOption = (title, index) => (
    <SelectItem key={index} title={title} />
  );

  return (
    <View style={styles.container}>
      <Input label="Name" onChangeText={e => handleChange(e, 'name')} />
      <Input
        style={styles.topMargin}
        label="Age"
        keyboardType="numeric"
        onChangeText={e => handleChange(e, 'age')}
      />
      <Select
        style={styles.topMargin}
        label="Type"
        value={typeData[selectedIndex]}
        onSelect={index => setSelectedIndex(index.row)}>
        <SelectItem title="Dog" value="dog" />
        <SelectItem title="Cat" value="cat" />
      </Select>
      <Input
        style={styles.topMargin}
        label="Breed"
        onChangeText={e => handleChange(e, 'breed')}
      />
      <Input
        style={styles.topMargin}
        label="Height"
        keyboardType="numeric"
        accessoryRight={() => <Text>inch</Text>}
        onChangeText={e => handleChange(e, 'height')}
      />
      <Input
        style={styles.topMargin}
        label="Weight"
        keyboardType="numeric"
        accessoryRight={() => <Text>kg</Text>}
        onChangeText={e => handleChange(e, 'weight')}
      />
      <Button style={styles.topMargin} onPress={handleSubmit}>
        SUBMIT
      </Button>

      <Modal visible={isRequestComplete}>
        <Card disabled={true} style={styles.modal}>
          <View style={styles.modalText}>
            <Text>{serverMessage}</Text>
          </View>
          <Button
            onPress={handleModalButton}
            style={styles.modalBtn}
            size="small">
            OK
          </Button>
        </Card>
      </Modal>

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
    padding: 15,
    backgroundColor: '#F7F9FC',
  },
  topMargin: {
    marginTop: 10,
  },
  modal: {
    minHeight: 200,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 5,
    minWidth: '70%',
  },
  modalText: {
    height: 150,
    justifyContent: 'center',
    maxWidth: 280,
  },
  modalBtn: {
    alignSelf: 'flex-end',
  },
});

export default AddPet;
