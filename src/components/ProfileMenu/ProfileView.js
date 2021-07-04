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
import {Input, Text, Button, Modal, Card} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {launchImageLibrary} from 'react-native-image-picker';

import {
  changeProfilePic,
  updateUserDetails,
  updateUserPassword,
} from '../../actions/profileActions';
import {getUser} from '../../actions/authActions';
import ProfileChangePassword from './ProfileChangePassword';

const ProfileView = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);
  const [isInChangePassword, setIsInChangePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [hasRequestError, setHasRequestError] = useState(false);
  const [image, setImage] = useState();
  const [email, setEmail] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
  const user = useSelector(state => state.auth.authData);
  const dispatch = useDispatch();

  useEffect(() => {
    clearFields();
  }, [isInEditMode, isInChangePassword]);

  useEffect(() => {
    if (user) {
      setImage(`http://petsmalu.xyz/uploads/${user.img_name}`);
    }
  }, [user]);

  const handleChangeDetails = () => {
    setIsLoading(true);
    dispatch(
      updateUserDetails(
        {
          user_id: user.user_id,
          email,
          mobile_num: mobileNumber,
          password: currentPassword,
        },
        setIsLoading,
        setIsRequestComplete,
        setServerMessage,
        setHasRequestError,
      ),
    );
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      setServerMessage("New password and confirm password doesn't match.");
      setIsRequestComplete(true);
      setHasRequestError(true);
    } else {
      setIsLoading(true);

      dispatch(
        updateUserPassword(
          {
            user_id: user.user_id,
            new_password: newPassword,
            password: currentPassword,
          },
          setIsLoading,
          setIsRequestComplete,
          setServerMessage,
          setHasRequestError,
        ),
      );
    }
  };

  const handleModalBtn = () => {
    setIsRequestComplete(false);

    if (!hasRequestError) {
      setIsInEditMode(false);
      setIsInChangePassword(false);
      setHasRequestError(false);

      setIsLoading(true);
      dispatch(getUser(user.user_id, setIsLoading));
    }
    setHasRequestError(false);
  };

  const clearFields = () => {
    setEmail(user.email);
    setMobileNumber(user.mobile_num);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsPasswordHidden(true);
    setIsNewPasswordHidden(true);
    setIsConfirmPasswordHidden(true);
  };

  const PasswordIcon = () => (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
      <Icon
        name={isPasswordHidden ? 'eye-slash' : 'eye'}
        size={23}
        color="#222"
      />
    </TouchableOpacity>
  );

  const NewPasswordIcon = type => (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => {
        type === 'new'
          ? setIsNewPasswordHidden(!isNewPasswordHidden)
          : setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
      }}>
      <Icon
        name={
          type === 'new'
            ? isNewPasswordHidden
              ? 'eye-slash'
              : 'eye'
            : isConfirmPasswordHidden
            ? 'eye-slash'
            : 'eye'
        }
        size={23}
        color="#222"
      />
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../images/background.png')}
      style={{
        resizeMode: 'cover',
        flex: 1,
        padding: 10,
      }}>
      <View
        style={{...styles.row, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() =>
            launchImageLibrary(
              {mediaType: 'photo', includeBase64: true},
              res => {
                if (res.didCancel) {
                  console.log('User cancelled image picker');
                } else if (res.error) {
                  console.log('ImagePicker Error: ', res.error);
                } else {
                  dispatch(
                    changeProfilePic(
                      {role: 'user', id: user.user_id},
                      res.assets[0].base64,
                      setIsLoading,
                      setIsRequestComplete,
                      setServerMessage,
                    ),
                  );
                }
              },
            )
          }>
          <Image
            style={styles.avatar}
            source={{
              uri: image,
            }}
            onError={() =>
              setImage('http://petsmalu.xyz/images/default_avatar.gif')
            }
          />
        </TouchableOpacity>
        <Text category="h3" style={styles.name}>
          {user.name}
        </Text>
      </View>

      {isInChangePassword ? (
        <View style={{...styles.bottomMargin, marginTop: 20}}>
          <Text style={styles.bold} category="h6">
            New Password:
          </Text>
          <Input
            onChangeText={e => setNewPassword(e)}
            accessoryRight={() => NewPasswordIcon('new')}
            textContentType="password"
            placeholder="New Password"
            secureTextEntry={isNewPasswordHidden}
          />

          <Text style={styles.bold} category="h6">
            Confirm Password:
          </Text>
          <Input
            onChangeText={e => setConfirmPassword(e)}
            accessoryRight={() => NewPasswordIcon('confirm')}
            textContentType="password"
            placeholder="Confirm Password"
            secureTextEntry={isConfirmPasswordHidden}
          />
        </View>
      ) : (
        <>
          <View style={{...styles.bottomMargin, marginTop: 20}}>
            <Text style={styles.bold} category="h6">
              Email:
            </Text>

            {isInEditMode ? (
              <Input
                value={email}
                onChangeText={e => setEmail(e)}
                keyboardType="email-address"
              />
            ) : (
              <Text category="h6">{user.email}</Text>
            )}
          </View>
          <View style={styles.bottomMargin}>
            <Text style={styles.bold} category="h6">
              Contact Number:
            </Text>

            {isInEditMode ? (
              <Input
                value={mobileNumber}
                onChangeText={e => setMobileNumber(e)}
                keyboardType="number-pad"
                maxLength={11}
              />
            ) : (
              <Text category="h6">{user.mobile_num}</Text>
            )}
          </View>
        </>
      )}

      {isInEditMode || isInChangePassword ? (
        <>
          <View style={styles.bottomMargin}>
            <Text style={styles.bold} category="h6">
              Enter Current Password to Confirm:
            </Text>
            <Input
              value={currentPassword}
              onChangeText={e => setCurrentPassword(e)}
              accessoryRight={PasswordIcon}
              textContentType="password"
              placeholder="Current Password"
              secureTextEntry={isPasswordHidden}
            />
          </View>
          <View style={styles.row}>
            <Button
              style={styles.submitBtn}
              onPress={
                isInEditMode ? handleChangeDetails : handleChangePassword
              }>
              SUBMIT
            </Button>
            <Button
              appearance="ghost"
              status="danger"
              onPress={() => {
                setIsInEditMode(false);
                setIsInChangePassword(false);
              }}>
              Cancel
            </Button>
          </View>
        </>
      ) : (
        <>
          <Button onPress={() => setIsInEditMode(true)}>CHANGE DETAILS</Button>
          <Button
            onPress={() => setIsInChangePassword(true)}
            appearance="outline"
            style={{marginTop: 5}}>
            CHANGE PASSWORD
          </Button>
        </>
      )}

      <Modal visible={isRequestComplete}>
        <Card disabled={true} style={styles.modal}>
          <View style={styles.modalText}>
            <Text>{serverMessage}</Text>
          </View>
          <Button
            onPress={handleModalBtn}
            style={styles.modalBtn}
            appearance="ghost">
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
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 15,
  },
  name: {
    flex: 1,
    flexWrap: 'wrap',
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
  icon: {
    justifyContent: 'center',
    paddingTop: 5,
  },
});

export default ProfileView;
