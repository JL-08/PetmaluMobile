import {GET_ALL_USER_PETS, GET_PET} from '../constants/actionTypes';
import * as api from '../api/index';
import RNFetchBlob from 'react-native-fetch-blob';

export const getAllUserPets = (user_id, setIsLoading) => async dispatch => {
  try {
    const {data} = await api.getAllUserPets(user_id);
    setIsLoading(false);

    dispatch({type: GET_ALL_USER_PETS, data});
  } catch (err) {
    console.log(err);
  }
};

export const updatePet =
  (
    formData,
    setIsLoading,
    setIsRequestComplete,
    setServerMessage,
    setHasRequestError,
  ) =>
  async dispatch => {
    try {
      const {data} = await api.updatePet(formData);
      setIsLoading(false);

      if (data.includes('updated')) {
        setServerMessage(data);
      } else {
        setServerMessage(data);
        setHasRequestError(true);
      }

      setIsRequestComplete(true);
    } catch (err) {
      console.log(err);
    }
  };

export const getPet = (id, setIsLoading) => async dispatch => {
  try {
    const {data} = await api.getPet(id);
    setIsLoading(false);

    dispatch({type: GET_PET, data});
  } catch (err) {
    console.log(err);
  }
};

export const changePetProfilePic =
  (
    data,
    fileBase64,
    setIsLoading,
    setIsRequestComplete,
    setServerMessage,
    setHasPictureChanged,
  ) =>
  async dispatch => {
    RNFetchBlob.fetch(
      'POST',
      'http://petsmalu.xyz/mobile/updatePetProfilePic.php',
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'image',
          filename: 'image.png',
          type: 'image/png',
          data: fileBase64,
        },
        {
          name: 'form',
          data: JSON.stringify({...data}),
        },
      ],
    )
      .then(res => {
        setIsLoading(false);

        if (res.data.includes('changed')) {
          setServerMessage("Your pet's picture has been changed.");
          setHasPictureChanged(true);
        } else {
          setServerMessage('Something went wrong. Please try again.');
        }
        setIsRequestComplete(true);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };
