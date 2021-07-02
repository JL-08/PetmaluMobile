import {GET_ALL_POSTS} from '../constants/actionTypes';
import * as api from '../api/index';
import RNFetchBlob from 'react-native-fetch-blob';

export const createPostWithImg =
  (data, fileBase64, setIsLoading, setIsRequestComplete, setServerMessage) =>
  async dispatch => {
    RNFetchBlob.fetch(
      'POST',
      'http://10.0.2.2/Petsmalu/createPostWithImg.php',
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
        if (res.data.includes('created')) {
          setServerMessage(res.data.replace('"', ''));
        } else {
          setServerMessage('Something went wrong. Please try again.');
        }
        setIsRequestComplete(true);
        console.log(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

export const createPost =
  (input, setIsLoading, setIsRequestComplete, setServerMessage) =>
  async dispatch => {
    try {
      const {data} = await api.createPost(input);
      setIsLoading(false);

      if (data.includes('created')) {
        setServerMessage(data.replace('"', ''));
      } else {
        setServerMessage('Something went wrong. Please try again.');
      }

      setIsRequestComplete(true);
    } catch (err) {
      console.log(err);
    }
  };

export const getAllPosts = setRefreshing => async dispatch => {
  try {
    const {data} = await api.getAllPosts();
    setRefreshing(false);

    dispatch({type: GET_ALL_POSTS, data});
  } catch (err) {
    console.log(err);
  }
};

export const updatePostWithImg =
  (data, fileBase64, setIsLoading, setIsRequestComplete, setServerMessage) =>
  async dispatch => {
    RNFetchBlob.fetch(
      'POST',
      'http://10.0.2.2/Petsmalu/updatePostWithImg.php',
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
        if (res.data.includes('updated')) {
          let newData = res.data.replace('"', '');
          setServerMessage(newData.replace('"', ''));
        } else {
          setServerMessage('Something went wrong. Please try again.');
        }
        setIsRequestComplete(true);
        console.log(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

export const updatePost =
  (input, setIsLoading, setIsRequestComplete, setServerMessage) =>
  async dispatch => {
    try {
      const {data} = await api.updatePost(input);
      setIsLoading(false);

      if (data.includes('updated')) {
        setServerMessage(data.replace('"', ''));
      } else {
        setServerMessage('Something went wrong. Please try again.');
      }

      setIsRequestComplete(true);
    } catch (err) {
      console.log(err);
    }
  };

export const deletePost =
  (postId, setIsRefreshing, setIsRequestComplete, setServerMessage) =>
  async dispatch => {
    try {
      const {data} = await api.deletePost(postId);
      setIsRefreshing(false);

      if (data.includes('deleted')) {
        setServerMessage(data.replace('"', ''));
      } else {
        setServerMessage('Something went wrong. Please try again.');
      }

      setIsRequestComplete(true);
    } catch (err) {
      console.log(err);
    }
  };
