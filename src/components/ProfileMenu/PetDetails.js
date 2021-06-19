import React, {useState} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Input, Text, Button} from '@ui-kitten/components';

const PetDetails = () => {
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
        <View>
          <Text category="h4" style={styles.name}>
            JORDI
          </Text>
          <Text category="h5">German Shepherd</Text>
        </View>
      </View>
      <View style={{...styles.bottomMargin, marginTop: 20, ...styles.row}}>
        <Text style={styles.bold} category="h6">
          Name:
        </Text>
        {isInEditMode ? (
          <Input value={'Jordi'} />
        ) : (
          <Text category="h6">Jordi</Text>
        )}
      </View>
      <View style={{...styles.bottomMargin, ...styles.row}}>
        <Text style={styles.bold} category="h6">
          Age:
        </Text>

        {isInEditMode ? <Input value={'2'} /> : <Text category="h6">2</Text>}
      </View>
      <View style={{...styles.bottomMargin, ...styles.row}}>
        <Text style={styles.bold} category="h6">
          Type:
        </Text>

        {isInEditMode ? (
          <Input value={'Dog'} />
        ) : (
          <Text category="h6">Dog</Text>
        )}
      </View>
      <View style={{...styles.bottomMargin, ...styles.row}}>
        <Text style={styles.bold} category="h6">
          Breed:
        </Text>

        {isInEditMode ? (
          <Input value={'German Shepherd'} />
        ) : (
          <Text category="h6">German Shepherd</Text>
        )}
      </View>
      <View style={{...styles.bottomMargin, ...styles.row}}>
        <Text style={styles.bold} category="h6">
          Height:
        </Text>

        {isInEditMode ? (
          <Input value={'16 inches'} />
        ) : (
          <Text category="h6">16 inches</Text>
        )}
      </View>
      <View style={{...styles.bottomMargin, ...styles.row}}>
        <Text style={styles.bold} category="h6">
          Weight:
        </Text>

        {isInEditMode ? (
          <Input value={'90 kg'} />
        ) : (
          <Text category="h6">90 kg</Text>
        )}
      </View>
      {isInEditMode ? (
        <>
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
        </>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
    marginRight: 10,
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
    fontWeight: 'bold',
  },
});

export default PetDetails;
