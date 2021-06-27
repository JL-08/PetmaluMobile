import React, {useState} from 'react';
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

const initialLoginData = {
  name: '',
  password: '',
};

const VetLogin = () => {
  const [vetFormData, setVetFormData] = useState(initialLoginData);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const handleChange = (e, name) => {
    setVetFormData({...vetFormData, [name]: e});
  };

  return (
    <ImageBackground
      source={require('../../images/background.png')}
      style={{
        resizeMode: 'cover',
        flex: 1,
      }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../images/Petmalu-2.png')}
          />
          <Text style={styles.logoText}>PETSMALU</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 20}}>
            Vet Login
          </Text>
          <TextInput
            value={vetFormData['name']}
            style={styles.input}
            textContentType="name"
            placeholder="Full Name"
            onChangeText={e => handleChange(e, 'name')}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              value={vetFormData['password']}
              style={styles.passwordInput}
              textContentType="password"
              placeholder="Password"
              secureTextEntry={isPasswordHidden}
              onChangeText={e => handleChange(e, 'password')}
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

          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnText}>LOGIN</Text>
          </TouchableOpacity>
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
});
export default VetLogin;
