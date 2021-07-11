import React from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {Layout, Text, ViewPager, Button} from '@ui-kitten/components';

export const StartUpScreen = ({navigation}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <Layout level="2">
        <Image
          style={{...styles.img, height: 100}}
          source={require('../../images/pubmat-7.jpg')}
        />
      </Layout>
      <ViewPager
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Layout level="2">
          <Image
            style={styles.img}
            source={require('../../images/pubmat-1.jpg')}
          />
        </Layout>
        <Layout level="2">
          <Image
            style={styles.img}
            source={require('../../images/pubmat-2.jpg')}
          />
        </Layout>
        <Layout level="2">
          <Image
            style={styles.img}
            source={require('../../images/pubmat-3.jpg')}
          />
        </Layout>
        <Layout level="2">
          <Image
            style={styles.img}
            source={require('../../images/pubmat-4.jpg')}
          />
        </Layout>
        <Layout level="2">
          <Image
            style={styles.img}
            source={require('../../images/pubmat-5.jpg')}
          />
        </Layout>
        <Layout level="2">
          <Image
            style={styles.img}
            source={require('../../images/pubmat-6.jpg')}
          />
        </Layout>
      </ViewPager>
      <Button
        style={styles.btn}
        onPress={() => navigation.reset({index: 0, routes: [{name: 'Auth'}]})}>
        PROCEED TO LOGIN
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  img: {
    height: 600,
    width: '100%',
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default StartUpScreen;
