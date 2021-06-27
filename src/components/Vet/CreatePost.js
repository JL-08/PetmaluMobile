import {Input, Button} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const CreatePost = () => {
  return (
    <View style={styles.container}>
      <Input style={styles.btmargin} label="Title" />
      <Input
        style={styles.btmargin}
        label="Body"
        multiline={true}
        textStyle={{minHeight: 64}}
      />
      <Button
        style={{...styles.uploadBtn, ...styles.btmargin}}
        appearance="outline"
        status="basic"
        accessoryLeft={() => <Icon name="upload" color="gray" />}
        size="small"
        onPress={() =>
          launchImageLibrary({mediaType: 'photo'}, res => {
            console.log(res);
          })
        }>
        Choose an Image
      </Button>
      <Button>SUBMIT</Button>
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
});
export default CreatePost;
