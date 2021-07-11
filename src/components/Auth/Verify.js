import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Text} from '@ui-kitten/components';

const Verify = ({email, code, setCode}) => {
  return (
    <View>
      <Text style={styles.text} category="s1">
        We have sent a verification code to {email}.
      </Text>
      <Input
        placeholder="Enter code here"
        value={code}
        onChangeText={nextValue => setCode(nextValue)}
      />
      {/* <View style={styles.row}>
        <Text style={styles.textMargin} category="s2">
          Didn't receive an email?
        </Text>
        <TouchableOpacity>
          <Text category="s2">Resend email</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textMargin: {
    marginRight: 5,
  },
  text: {
    marginVertical: 10,
  },
});

export default Verify;
