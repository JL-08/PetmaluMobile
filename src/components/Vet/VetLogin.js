import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import {Modal, Card, Button} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {vetLogin} from '../../actions/authActions';

const initialLoginData = {
  email: '',
  password: '',
};

const VetLogin = ({navigation}) => {
  const [vetFormData, setVetFormData] = useState(initialLoginData);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const [hasRequestError, setHasRequestError] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (isValidInputs(vetFormData)) {
      setIsLoading(true);
      dispatch(
        vetLogin(
          vetFormData,
          setServerMessage,
          setIsRequestComplete,
          setHasRequestError,
          setIsLoading,
          navigation,
        ),
      );
    } else {
      setPromptMessage(
        'Please fill out all the fields and input valid values.',
      );
      setShowPrompt(true);
    }
  };

  const handleChange = (e, name) => {
    setVetFormData({...vetFormData, [name]: e});
  };

  const handleModalButton = () => {
    setIsRequestComplete(false);
  };

  const handlePrompt = () => {
    setShowPrompt(false);
  };

  const isValidInputs = data => {
    var hasError = false;

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
            value={vetFormData['email']}
            style={styles.input}
            textContentType="emailAddress"
            placeholder="Email"
            onChangeText={e => handleChange(e, 'email')}
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

          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>LOGIN</Text>
          </TouchableOpacity>
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
export default VetLogin;
