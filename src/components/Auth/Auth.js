import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Card, Layout, Modal} from '@ui-kitten/components';
import PetForm from './PetForm';
import Verify from './Verify';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {login, register, verify} from '../../actions/authActions';
import {set} from 'react-native-reanimated';

const initialLoginData = {
  email: '',
  password: '',
};

const initialRegisterData = {
  email: '',
  password: '',
  name: '',
  mobile_num: '',
};

const initialPetData = {
  pet_name: '',
  age: '',
  type: 'dog',
  breed: '',
  height: '',
  weight: '',
};

const Auth = ({navigation}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isInRegister, setIsInRegister] = useState(false);
  const [isInPetForm, setIsInPetForm] = useState(false);
  const [isInVerify, setIsInVerify] = useState(false);
  const [loginFormData, setLoginFormData] = useState(initialLoginData);
  const [registerFormData, setRegisterFormData] = useState(initialRegisterData);
  const [petFormData, setPetFormData] = useState(initialPetData);
  const [userEmail, setUserEmail] = useState(initialRegisterData);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [hasRequestError, setHasRequestError] = useState(false);
  const [hasFormError, setHasFormError] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState();
  const dispatch = useDispatch();

  const handleButton = async () => {
    if (isInRegister && isInPetForm) {
      if (isValidInputs(petFormData, 'registerPet')) {
        setIsLoading(true);
        setUserEmail(registerFormData.email);
        dispatch(
          register(
            registerFormData,
            petFormData,
            setServerMessage,
            setIsRequestComplete,
            setHasRequestError,
            setIsLoading,
          ),
        );
      } else {
        setPromptMessage(
          'Please fill out all the fields and input valid values.',
        );
        setShowPrompt(true);
      }
    } else if (!isInRegister && !isInVerify) {
      if (isValidInputs(loginFormData, 'login')) {
        setIsLoading(true);
        setUserEmail(loginFormData.email);
        dispatch(
          login(
            loginFormData,
            setServerMessage,
            setIsRequestComplete,
            setHasRequestError,
            setIsLoading,
            navigation,
            goToVerify,
          ),
        );
      } else {
        setPromptMessage(
          'Please fill out all the fields and input valid values.',
        );
        setShowPrompt(true);
      }

      // navigation.reset({index: 0, routes: [{name: 'Home'}]});
    } else if (isInRegister) {
      if (isValidInputs(registerFormData, 'register')) {
        setIsInPetForm(true);
      } else {
        setPromptMessage(
          'Please fill out all the fields and input valid values.',
        );
        setShowPrompt(true);
      }
    } else {
      console.log('verify here');
      setIsLoading(true);
      dispatch(
        verify(
          {email: userEmail, code},
          setServerMessage,
          setIsRequestComplete,
          setHasRequestError,
          setIsLoading,
          goToLogin,
        ),
      );
    }
  };

  const handleSwitch = () => {
    if (isInRegister && !isInVerify) {
      setIsInRegister(false);
      setIsInPetForm(false);
      clearFields();
    } else if (isInVerify) {
      setIsInRegister(false);
      setIsInPetForm(false);
      setIsInVerify(false);
      clearFields();
    } else {
      setIsInRegister(true);
    }
  };

  const goToVerify = () => {
    setIsInPetForm(false);
    setIsInRegister(false);
    setIsInVerify(true);
    clearFields();
  };

  const goToLogin = () => {
    setIsInRegister(false);
    setIsInPetForm(false);
    setIsInVerify(false);
  };

  const handleChange = (e, name, method) => {
    if (method === 'login') {
      setLoginFormData({...loginFormData, [name]: e});
    }
    if (method === 'register') {
      setRegisterFormData({...registerFormData, [name]: e});
    }
    if (method === 'petRegister') {
      setPetFormData({...petFormData, [name]: e});
    }
  };

  const handleModalButton = () => {
    setIsRequestComplete(false);

    console.log(hasRequestError, hasFormError, isInRegister);
    if (!hasRequestError && !hasFormError && isInRegister) {
      goToVerify();
    }
  };

  const handlePrompt = () => {
    setShowPrompt(false);
  };

  const clearFields = () => {
    setLoginFormData(initialLoginData);
    setRegisterFormData(initialRegisterData);
    setPetFormData(initialPetData);
  };

  const isValidInputs = (data, type) => {
    var hasError = false;

    if (type === 'login') {
      Object.entries(data).forEach(item => {
        if (item[1] === '') {
          hasError = true;
        }

        if (item[0] === 'email') {
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!regex.test(item[1])) {
            hasError = true;
          }
        }
      });
    }

    if (type === 'register') {
      Object.entries(data).forEach(item => {
        if (item[1] === '') {
          hasError = true;
        }

        if (
          item[0] === 'mobile_num' &&
          (item[1].length < 11 || !item[1].startsWith('09'))
        ) {
          hasError = true;
        }
      });
    }

    if (type === 'registerPet') {
      Object.entries(data).forEach(item => {
        if (item[1] === '') {
          hasError = true;
        }
      });
    }

    return !hasError;
  };

  return (
    <ImageBackground
      source={require('../../images/background.png')}
      style={{
        resizeMode: 'cover',
        flex: 1,
      }}>
      <View style={styles.container}>
        {!isInRegister && !isInVerify && (
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('../../images/Petmalu-2.png')}
            />
            <Text style={styles.logoText}>PETSMALU</Text>
          </View>
        )}

        <View style={styles.formContainer}>
          <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 20}}>
            {isInRegister
              ? 'Register'
              : isInVerify
              ? 'Verify Your Account'
              : 'Login'}
          </Text>
          {isInVerify && (
            <Verify email={userEmail} code={code} setCode={setCode} />
          )}
          {isInRegister && !isInPetForm && (
            <>
              <Text style={styles.heading}>User Details</Text>
              <TextInput
                value={registerFormData['name']}
                style={styles.input}
                textContentType="name"
                placeholder="Full Name"
                onChangeText={e => handleChange(e, 'name', 'register')}
              />
            </>
          )}

          {!isInPetForm && !isInVerify && (
            <>
              <TextInput
                value={
                  isInRegister
                    ? registerFormData['email']
                    : loginFormData['email']
                }
                style={styles.input}
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email Address"
                onChangeText={e =>
                  isInRegister
                    ? handleChange(e, 'email', 'register')
                    : handleChange(e, 'email', 'login')
                }
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  value={
                    isInRegister
                      ? registerFormData['password']
                      : loginFormData['password']
                  }
                  style={styles.passwordInput}
                  textContentType="password"
                  placeholder="Password"
                  secureTextEntry={isPasswordHidden}
                  onChangeText={e =>
                    isInRegister
                      ? handleChange(e, 'password', 'register')
                      : handleChange(e, 'password', 'login')
                  }
                />
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                  <Icon
                    name={isPasswordHidden ? 'eye-slash' : 'eye'}
                    size={23}
                    color="#222"
                  />
                </TouchableOpacity>
              </View>
            </>
          )}

          {isInRegister && (
            <>
              {!isInPetForm && (
                <TextInput
                  value={registerFormData['mobile_num']}
                  style={styles.input}
                  keyboardType="numeric"
                  textContentType="telephoneNumber"
                  placeholder="Mobile Number"
                  maxLength={11}
                  onChangeText={e => handleChange(e, 'mobile_num', 'register')}
                />
              )}

              {isInPetForm && (
                <PetForm
                  styleSheet={styles}
                  petFormData={petFormData}
                  setIsInPetForm={setIsInPetForm}
                  handleChange={handleChange}
                />
              )}
            </>
          )}

          {/* {!isInRegister && !isInVerify && (
            <TouchableOpacity style={styles.forgotBtn}>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          )} */}

          <TouchableOpacity style={styles.btn} onPress={handleButton}>
            <Text style={styles.btnText}>
              {isInVerify
                ? 'VERIFY'
                : !isInRegister
                ? 'LOGIN'
                : isInPetForm
                ? 'SUBMIT'
                : 'NEXT'}
            </Text>
          </TouchableOpacity>
          <View style={styles.switchContainer}>
            <Text Text style={{color: '#44609D'}}>
              {isInRegister
                ? 'Already have an account?'
                : isInVerify
                ? ''
                : "Don't have an account?"}
            </Text>
            <TouchableOpacity onPress={handleSwitch}>
              <Text
                style={{
                  marginLeft: 5,
                  color: '#44609D',
                  fontWeight: '700',
                }}>
                {isInRegister
                  ? 'Login here'
                  : isInVerify
                  ? 'Verify my account later'
                  : 'Register here'}
              </Text>
            </TouchableOpacity>
          </View>

          {!isInRegister && !isInVerify && (
            <View style={styles.switchContainer}>
              <Text Text style={{color: '#44609D'}}>
                For veterinarians,
              </Text>
              <TouchableOpacity onPress={() => navigation.push('Login as Vet')}>
                <Text
                  style={{
                    marginLeft: 5,
                    color: '#44609D',
                    fontWeight: '700',
                  }}>
                  Login here
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

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

      <Modal visible={showPrompt}>
        <Card disabled={true} style={styles.modal}>
          <View style={styles.modalText}>
            <Text>{promptMessage}</Text>
          </View>
          <Button
            onPress={handlePrompt}
            style={styles.modalBtn}
            appearance="ghost"
            status="basic">
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
  container: {
    padding: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    fontSize: 30,
    fontWeight: '700',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  heading: {
    fontWeight: '700',
    marginTop: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 10,
    paddingBottom: 2,
  },
  breedInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 2,
  },
  passwordInput: {
    flex: 1,
    paddingBottom: 2,
  },
  passwordContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  icon: {
    justifyContent: 'center',
    paddingTop: 5,
  },
  forgotBtn: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  btn: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    marginTop: 30,
    justifyContent: 'center',
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  modal: {
    minHeight: 200,
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 5,
  },
  modalText: {
    height: 150,
    justifyContent: 'center',
  },
  modalBtn: {
    alignSelf: 'flex-end',
  },
});

export default Auth;
