import React from 'react';

import {StyleSheet} from 'react-native';

import {Text} from '@ui-kitten/components';

const ContentTitle = ({title}) => {
  return (
    <>
      <Text style={styles.title} category="h6">
        {title}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
});

export default ContentTitle;
