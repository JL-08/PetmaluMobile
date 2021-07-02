import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Input, Button, Text, Modal, Card} from '@ui-kitten/components';
import {launchImageLibrary} from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {createPost} from '../../actions/postActions';

const CreatePost = ({navigation}) => {
  const [fileName, setFileName] = useState('');
  const [fileBase64, setFileBase64] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestComplete, setIsRequestComplete] = useState(false);
  const [serverMessage, setServerMessage] = useState();
  const vet = useSelector(state => state.auth.authVetData);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setIsLoading(true);
    dispatch(
      createPost(
        {title, body, vet_id: vet.id},
        fileBase64,
        setIsLoading,
        setIsRequestComplete,
        setServerMessage,
      ),
    );
  };

  const handleModalButton = () => {
    setIsRequestComplete(false);

    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  const truncateString = (str, num) => {
    if (str === '') {
      return 'none';
    }

    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.btmargin}
        label="Title"
        value={title}
        onChangeText={e => setTitle(e)}
      />
      <Input
        style={styles.btmargin}
        label="Body"
        value={body}
        multiline={true}
        textStyle={{minHeight: 64}}
        onChangeText={e => setBody(e)}
      />
      <Text style={{color: '#9BA6BA', marginBottom: 5}} category="label">
        Image (optional)
      </Text>
      <View style={styles.row}>
        <Button
          style={{...styles.uploadBtn, ...styles.btmargin}}
          appearance="outline"
          status="basic"
          accessoryLeft={() => <Icon name="upload" color="gray" />}
          size="small"
          onPress={() =>
            launchImageLibrary(
              {mediaType: 'photo', includeBase64: true},
              res => {
                if (res.didCancel) {
                  console.log('User cancelled image picker');
                } else if (res.error) {
                  console.log('ImagePicker Error: ', res.error);
                } else {
                  setFileName(res.assets[0].fileName);
                  setFileBase64(res.assets[0].base64);
                }
              },
            )
          }>
          Choose an Image
        </Button>
        <Text style={styles.imageText} category="c1">
          uploaded: {truncateString(fileName, 20)}
        </Text>
      </View>
      <Button onPress={handleSubmit}>SUBMIT</Button>

      <Modal visible={isRequestComplete}>
        <Card disabled={true} style={styles.modal}>
          <View style={styles.modalText}>
            <Text>{serverMessage}</Text>
          </View>
          <Button
            onPress={handleModalButton}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  uploadBtn: {
    width: 150,
  },
  btmargin: {
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageText: {
    color: '#888',
    marginLeft: 10,
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
});
export default CreatePost;
