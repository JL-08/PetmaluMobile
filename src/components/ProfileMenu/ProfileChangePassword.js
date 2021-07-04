import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Input} from '@ui-kitten/components';

import Icon from 'react-native-vector-icons/dist/FontAwesome';

const ProfileChangePassword = (setNewPassword, setConfirmPassword) => {
  const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(false);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(false);

  const PasswordIcon = type => (
    <TouchableOpacity
      style={styles.icon}
      onPress={() => {
        type === 'new'
          ? setIsNewPasswordHidden(!isNewPasswordHidden)
          : setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
      }}>
      <Icon
        name={
          type === 'new'
            ? isNewPasswordHidden
              ? 'eye-slash'
              : 'eye'
            : isConfirmPasswordHidden
            ? 'eye-slash'
            : 'eye'
        }
        size={23}
        color="#222"
      />
    </TouchableOpacity>
  );

  return (
    <View style={{...styles.bottomMargin, marginTop: 20}}>
      <Text style={styles.bold} category="h6">
        New Password:
      </Text>
      <Input
        onChangeText={e => setNewPassword(e)}
        accessoryRight={() => PasswordIcon('new')}
        textContentType="password"
        placeholder="New Password"
        secureTextEntry={isNewPasswordHidden}
      />

      <Text style={styles.bold} category="h6">
        Confirm Password:
      </Text>
      <Input
        onChangeText={e => setConfirmPassword(e)}
        accessoryRight={() => PasswordIcon('confirm')}
        textContentType="password"
        placeholder="Confirm Password"
        secureTextEntry={isConfirmPasswordHidden}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  bottomMargin: {
    marginBottom: 10,
  },
  icon: {
    justifyContent: 'center',
    paddingTop: 5,
  },
});

export default ProfileChangePassword;
