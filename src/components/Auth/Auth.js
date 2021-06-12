import React, {useState} from 'react';
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
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Auth = ({navigation}) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isInRegister, setIsInRegister] = useState(false);
  const [isInPetForm, setIsInPetForm] = useState(false);
  const [isInVerify, setIsInVerify] = useState(false);

  const handleButton = () => {
    if (isInRegister && isInPetForm) {
      console.log('submit registration');
      setIsInPetForm(false);
      setIsInRegister(false);
      setIsInVerify(true);
    } else if (!isInRegister && !isInVerify) {
      navigation.reset({index: 0, routes: [{name: 'Home'}]});
    } else if (isInRegister) {
      setIsInPetForm(true);
    } else {
      console.log('verify here');
      setIsInRegister(false);
      setIsInPetForm(false);
      setIsInVerify(false);
    }
  };

  const handleSwitch = () => {
    if (isInRegister && !isInVerify) {
      setIsInRegister(false);
      setIsInPetForm(false);
    } else if (isInVerify) {
      setIsInRegister(false);
      setIsInPetForm(false);
      setIsInVerify(false);
    } else {
      setIsInRegister(true);
    }
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
          {isInVerify && <Verify />}
          {isInRegister && !isInPetForm && (
            <>
              <Text style={styles.heading}>User Details</Text>
              <TextInput
                style={styles.input}
                textContentType="name"
                placeholder="Full Name"
              />
            </>
          )}

          {!isInPetForm && !isInVerify && (
            <>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                textContentType="emailAddress"
                placeholder="Email Address"
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  textContentType="password"
                  placeholder="Password"
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
                  style={styles.input}
                  keyboardType="numeric"
                  textContentType="telephoneNumber"
                  placeholder="Contact Number"
                />
              )}

              {isInPetForm && (
                <PetForm styleSheet={styles} setIsInPetForm={setIsInPetForm} />
              )}
            </>
          )}

          {!isInRegister && !isInVerify && (
            <TouchableOpacity style={styles.forgotBtn}>
              <Text>Forgot Password?</Text>
            </TouchableOpacity>
          )}

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
        </View>
      </View>
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
});

export default Auth;
