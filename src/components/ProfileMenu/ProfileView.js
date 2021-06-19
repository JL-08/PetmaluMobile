import React, {useState} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Input, Text, Button} from '@ui-kitten/components';

const ProfileView = () => {
  const [isInEditMode, setIsInEditMode] = useState(false);

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
        <Image
          style={styles.avatar}
          source={require('../../images/avatar.gif')}
        />
        <Text category="h3" style={styles.name}>
          IAN BENEDICT PACELO
        </Text>
      </View>
      <View style={{...styles.bottomMargin, marginTop: 20}}>
        <Text style={styles.bold} category="h6">
          Email:
        </Text>
        {isInEditMode ? (
          <Input value={'hello@gmail.com'} />
        ) : (
          <Text category="h6">hello@gmail.com</Text>
        )}
      </View>
      <View style={styles.bottomMargin}>
        <Text style={styles.bold} category="h6">
          Contact Number:
        </Text>

        {isInEditMode ? (
          <Input value={'09123456789'} />
        ) : (
          <Text category="h6">09123456789</Text>
        )}
      </View>
      {isInEditMode ? (
        <>
          <View style={styles.bottomMargin}>
            <Text style={styles.bold} category="h6">
              Enter Password to Confirm:
            </Text>
            <Input value={'12345678'} />
          </View>
          <View style={styles.row}>
            <Button style={styles.submitBtn}>SUBMIT</Button>
            <Button
              appearance="ghost"
              status="danger"
              onPress={() => setIsInEditMode(false)}>
              Cancel
            </Button>
          </View>
        </>
      ) : (
        <>
          <Button onPress={() => setIsInEditMode(true)}>CHANGE DETAILS</Button>
          <Button
            onPress={() => setIsInEditMode(true)}
            appearance="outline"
            style={{marginTop: 5}}>
            CHANGE PASSWORD
          </Button>
        </>
      )}
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
});

export default ProfileView;
