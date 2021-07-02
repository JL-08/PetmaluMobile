import {GET_ALL_VETS} from '../constants/actionTypes';
import * as api from '../api/index';
import RNFetchBlob from 'react-native-fetch-blob';

export const createPost =
  (data, fileBase64, setIsLoading, setIsRequestComplete, setServerMessage) =>
  async dispatch => {
    RNFetchBlob.fetch(
      'POST',
      'http://10.0.2.2/Petsmalu/createPost.php',
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
        setIsRequestComplete(true);

        if (res.data.includes('created')) {
          setServerMessage(res.data);
        }
        console.log(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };
