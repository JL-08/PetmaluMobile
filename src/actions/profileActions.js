import * as api from '../api/index';
import RNFetchBlob from 'react-native-fetch-blob';

export const changeProfilePic =
  (data, fileBase64, setIsLoading, setIsRequestComplete, setServerMessage) =>
  async dispatch => {
    RNFetchBlob.fetch(
      'POST',
      'http://10.0.2.2/Petsmalu/updateProfilePic.php',
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
          setServerMessage('Your profile picture has been changed.');
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

export const updateUserDetails =
  (
    formData,
    setIsLoading,
    setIsRequestComplete,
    setServerMessage,
    setHasRequestError,
  ) =>
  async dispatch => {
    try {
      const {data} = await api.updateUserDetails(formData);
      setIsLoading(false);

      if (data.includes('update')) {
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

export const updateUserPassword =
  (
    formData,
    setIsLoading,
    setIsRequestComplete,
    setServerMessage,
    setHasRequestError,
  ) =>
  async dispatch => {
    try {
      const {data} = await api.updateUserPassword(formData);
      setIsLoading(false);

      if (data.includes('changed')) {
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
