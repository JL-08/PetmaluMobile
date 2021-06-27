import {Input, Button} from '@ui-kitten/components';
import React from 'react';
import {View, StyleSheet} from 'react-native';

const EditPost = () => {
  return (
    <View style={styles.container}>
      <Input style={styles.btmargin} label="Title" />
      <Input
        style={styles.btmargin}
        label="Body"
        multiline={true}
        textStyle={{minHeight: 64}}
      />
      <Button>SAVE CHANGES</Button>
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
export default EditPost;
