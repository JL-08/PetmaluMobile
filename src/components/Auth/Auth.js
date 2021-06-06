import React, {useState} from 'react';
import PetForm from './PetForm';

import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Auth = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isInRegister, setIsInRegister] = useState(false);
  const [isInPetForm, setIsInPetForm] = useState(false);

  const handleButton = () => {
    if (isInRegister && isInPetForm) {
      console.log('submit registration');
      setIsInPetForm(false);
      setIsInRegister(false);
    } else if (!isInRegister) {
      console.log('login user');
    } else {
      setIsInPetForm(true);
    }
  };

  const handleSwitch = () => {
    console.log(isInRegister);
    if (isInRegister) {
      setIsInRegister(false);
      setIsInPetForm(false);
    } else {
      setIsInRegister(true);
    }
  };
  return (
    <View style={styles.container}>
      {!isInRegister && (
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
          {isInRegister ? 'Register' : 'Login'}
        </Text>
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

        {!isInPetForm && (
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

        {!isInRegister && !isInPetForm && (
          <TouchableOpacity style={styles.forgotBtn}>
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.btn} onPress={handleButton}>
          <Text style={styles.btnText}>
            {!isInRegister ? 'LOGIN' : isInPetForm ? 'SUBMIT' : 'NEXT'}
          </Text>
        </TouchableOpacity>
        <View style={styles.switchContainer}>
          <Text>
            {isInRegister
              ? 'Already have an account?'
              : "Don't have an account?"}
          </Text>
          <TouchableOpacity onPress={handleSwitch}>
            <Text style={{marginLeft: 5}}>
              {isInRegister ? 'Login here' : 'Register here'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginTop: 10,
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
    marginTop: 50,
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
