import {
  GET_ALL_USER_APPOINTMENTS,
  GET_ALL_VET_APPOINTMENTS,
  GET_APPOINTMENTS_BY_STATUS,
} from '../constants/actionTypes';
import * as api from '../api/index';
import RNFetchBlob from 'react-native-fetch-blob';

export const getAllUserAppointments =
  (user_id, setIsLoading) => async dispatch => {
    try {
      const {data} = await api.getAllUserAppointments(user_id);
      setIsLoading(false);

      dispatch({type: GET_ALL_USER_APPOINTMENTS, data});
    } catch (err) {
      console.log(err);
    }
  };

export const getAllVetAppointments =
  (vet_id, setIsLoading) => async dispatch => {
    try {
      const {data} = await api.getAllVetAppointments(vet_id);
      setIsLoading(false);

      dispatch({type: GET_ALL_VET_APPOINTMENTS, data});
    } catch (err) {
      console.log(err);
    }
  };

// export const createAppointment =
//   (
//     appointmentData,
//     setServerMessage,
//     setIsRequestComplete,
//     setHasRequestError,
//     setIsLoading,
//   ) =>
//   async dispatch => {
//     try {
//       const {data} = await api.createAppointment(appointmentData);
//       setIsLoading(false);

//       if (data.includes('You have successfully booked this appointment')) {
//         setServerMessage(data);
//         setIsRequestComplete(true);
//       }

//       if (data.includes("Sorry, this date isn't available")) {
//         setServerMessage(data);
//         setIsRequestComplete(true);
//         setHasRequestError(true);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

export const createAppointment =
  (
    appointmentData,
    fileBase64,
    setServerMessage,
    setIsRequestComplete,
    setHasRequestError,
    setIsLoading,
  ) =>
  async dispatch => {
    RNFetchBlob.fetch(
      'POST',
      'http://petsmalu.xyz/mobile/createAppointment.php',
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
          data: JSON.stringify({...appointmentData}),
        },
      ],
    )
      .then(res => {
        setIsLoading(false);
        if (res.data.includes('booked')) {
          let newData = res.data.replace('"', '');
          setServerMessage(newData.replace('"', ''));
        } else {
          setServerMessage('Something went wrong. Please try again.');
          setHasRequestError(true);
        }
        setIsRequestComplete(true);
        console.log(res.data);
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

export const getAppointmentsByStatus =
  (appointmentData, setRefreshing) => async dispatch => {
    try {
      const {data} = await api.getAppointmentsByStatus(appointmentData);
      setRefreshing(false);

      dispatch({type: GET_APPOINTMENTS_BY_STATUS, data});
    } catch (err) {
      console.log(err);
    }
  };

export const updateAppointmentStatus =
  (appointmentData, setServerMessage, setIsRequestComplete, setIsLoading) =>
  async dispatch => {
    try {
      console.log(appointmentData);
      const {data} = await api.updateAppointmentStatus(appointmentData);
      console.log(data);

      setIsLoading(false);
      if (data.includes('Appointment')) {
        setServerMessage(data);
        setIsRequestComplete(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

export const checkAppointmentValidity =
  (
    appointmentData,
    setServerMessage,
    setIsRequestComplete,
    setHasRequestError,
    setIsLoading,
    navigation,
  ) =>
  async dispatch => {
    try {
      const {data} = await api.checkAppointmentValidity(appointmentData);
      setIsLoading(false);
      // if (data.includes('This date is available')) {
      //   // navigate to booking
      //   navigation.push('Booking Details', {
      //     appointment: {...appointmentData},
      //   });
      // }

      if (data.includes("Sorry, this date isn't available")) {
        setServerMessage(data);
        setIsRequestComplete(true);
        setHasRequestError(true);
      } else {
        navigation.push('Booking Details', {
          appointment: {...appointmentData},
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
