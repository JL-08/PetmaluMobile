import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Input,
  Text,
  Button,
  Select,
  SelectItem,
  Modal,
  Card,
} from '@ui-kitten/components';
import {launchImageLibrary} from 'react-native-image-picker';

const petTypes = ['Dog', 'Cat'];

import {updatePet, getPet, changePetProfilePic} from '../../actions/petActons';

const PetDetails = ({route, navigation}) => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(
    route.params.type === 'dog' || route.params.type === 'Dog' ? 0 : 1,
  );
  const [petDetails, setPetDetails] = useState(route.params);
  const [petForm, setPetForm] = useState(route.params);
  const [image, setImage] = useState(
    route.params.img_name === null || route.params.img_name === ''
      ? 'http://petsmalu.xyz/images/default_avatar.gif'
      : `http://petsmalu.xyz/uploads/${route.params.img_name}`,
  );
  const [hasPictureChanged, setHasPictureChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [hasRequestError, setHasRequestError] = useState(false);
  const pet = useSelector(state => state.pet.petDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(false);
    dispatch(getPet(petDetails.id, setIsLoading));
  }, []);

  useEffect(() => {
    if (pet) {
      setPetDetails(pet);
      setPetForm(pet);

      if (hasPictureChanged) {
        setImage(`http://petsmalu.xyz/uploads/${pet.img_name}`);
        setHasPictureChanged(false);
      }
    }
  }, [pet]);

  useEffect(() => {
    if (pet) {
      setPetDetails(pet);
      setPetForm(pet);
      setSelectedIndex(pet.type === 'dog' || pet.type === 'Dog' ? 0 : 1);
    }
  }, [isInEditMode]);

  const handleSubmit = () => {
    setIsLoading(true);
    dispatch(
      updatePet(
        {...petForm, type: petTypes[selectedIndex]},
        setIsLoading,
        setIsRequestComplete,
        setServerMessage,
        setHasRequestError,
      ),
    );
  };

  const handleChange = (e, name) => {
    setPetForm({...petForm, [name]: e});
  };

  const handleModalButton = () => {
    setIsRequestComplete(false);

    if (!hasRequestError) {
      setIsInEditMode(false);

      setIsLoading(false);
      dispatch(getPet(petDetails.id, setIsLoading));
    }
  };

  const uploadPicture = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        setIsLoading(true);
        dispatch(
          changePetProfilePic(
            {id: petDetails.id},
            res.assets[0].base64,
            setIsLoading,
            setIsRequestComplete,
            setServerMessage,
            setHasPictureChanged,
          ),
        );
      }
    });
  };

  const changeImg = item => {
    if (item.img_name === null || item.img_name === '') {
      return 'http://petsmalu.xyz/images/pet_default_avatar.png';
    } else {
      return `http://petsmalu.xyz/uploads/${item.img_name}`;
    }
  };

  return (
    <ImageBackground
      source={require('../../images/background.png')}
      style={{
        resizeMode: 'cover',
        flex: 1,
        padding: 15,
      }}>
      <View
        style={{...styles.row, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={uploadPicture}>
          <Image
            style={styles.avatar}
            source={{
              uri: changeImg(petDetails),
            }}
          />
        </TouchableOpacity>

        <View>
          <Text category="h4" style={styles.name}>
            {petDetails.name}
          </Text>
          <Text category="h5">{petDetails.breed}</Text>
        </View>
      </View>
      <View
        style={
          isInEditMode
            ? {...styles.bottomMargin, marginTop: 20}
            : {...styles.bottomMargin, marginTop: 20, ...styles.row}
        }>
        <Text style={styles.bold} category="h6">
          Name:
        </Text>
        {isInEditMode ? (
          <Input
            value={petForm.name}
            onChangeText={e => handleChange(e, 'name')}
          />
        ) : (
          <Text category="h6">{petDetails.name}</Text>
        )}
      </View>
      <View
        style={
          isInEditMode
            ? {...styles.bottomMargin}
            : {...styles.bottomMargin, ...styles.row}
        }>
        <Text style={styles.bold} category="h6">
          Age:
        </Text>

        {isInEditMode ? (
          <Input
            value={petForm.age}
            onChangeText={e => handleChange(e, 'age')}
          />
        ) : (
          <Text category="h6">{petDetails.age}</Text>
        )}
      </View>
      <View
        style={
          isInEditMode
            ? {...styles.bottomMargin}
            : {...styles.bottomMargin, ...styles.row}
        }>
        <Text style={styles.bold} category="h6">
          Type:
        </Text>

        {isInEditMode ? (
          <Select
            onSelect={index => setSelectedIndex(index.row)}
            value={petTypes[selectedIndex]}>
            <SelectItem title="Dog" />
            <SelectItem title="Cat" />
          </Select>
        ) : (
          <Text category="h6">{petDetails.type}</Text>
        )}
      </View>
      <View
        style={
          isInEditMode
            ? {...styles.bottomMargin}
            : {...styles.bottomMargin, ...styles.row}
        }>
        <Text style={styles.bold} category="h6">
          Breed:
        </Text>

        {isInEditMode ? (
          <Input
            style={{backgroundColor: 'white'}}
            value={petForm.breed}
            onChangeText={e => handleChange(e, 'breed')}
          />
        ) : (
          <Text category="h6">{petDetails.breed}</Text>
        )}
      </View>
      <View
        style={
          isInEditMode
            ? {...styles.bottomMargin}
            : {...styles.bottomMargin, ...styles.row}
        }>
        <Text style={styles.bold} category="h6">
          Height:
        </Text>

        {isInEditMode ? (
          <Input
            style={{backgroundColor: 'white'}}
            value={petForm.height}
            onChangeText={e => handleChange(e, 'height')}
            accessoryRight={() => <Text>inch</Text>}
          />
        ) : (
          <Text category="h6">{petDetails.height} inches</Text>
        )}
      </View>
      <View
        style={
          isInEditMode
            ? {...styles.bottomMargin}
            : {...styles.bottomMargin, ...styles.row}
        }>
        <Text style={styles.bold} category="h6">
          Weight:
        </Text>

        {isInEditMode ? (
          <Input
            style={{backgroundColor: 'white'}}
            value={petForm.weight}
            onChangeText={e => handleChange(e, 'weight')}
            accessoryRight={() => <Text>kg</Text>}
          />
        ) : (
          <Text category="h6">{petDetails.weight} kg</Text>
        )}
      </View>
      {isInEditMode ? (
        <>
          <View style={styles.row}>
            <Button style={styles.submitBtn} onPress={handleSubmit}>
              SUBMIT
            </Button>
            <Button
              appearance="ghost"
              status="danger"
              onPress={() => setIsInEditMode(false)}>
              Cancel
            </Button>
          </View>
        </>
      ) : (
        <>
          <Button onPress={() => setIsInEditMode(true)}>CHANGE DETAILS</Button>
        </>
      )}

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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  bottomMargin: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  submitBtn: {
    flex: 1,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 100,
    marginRight: 15,
  },
  name: {
    fontWeight: 'bold',
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

export default PetDetails;
