import React from 'react';
import {View, ScrollView, Image, StyleSheet} from 'react-native';
import {Text} from '@ui-kitten/components';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../images/pawssion_logo.png')}
      />
      <Text style={styles.bottomMargin} category="p1">
        Pawssion Project is a non-profit organization dedicated to the rescue,
        rehabilitation and rehoming of dogs in distress. Pawssion Project began
        in Bacolod, armed simply with a lot of hope, courage and the unwavering
        support of a few good friends. After that first pound rescue, numerous
        reports poured in one after another, which eventually led to the opening
        of a second shelter in Bulacan in mid 2019. Since then, the journey has
        led Pawssion Project to more than 500 rescues, and thankfully over 100
        rehomed dogs.
      </Text>
      <View style={styles.bottomMargin}>
        <Text style={styles.textBold}>WEBSITE:</Text>
        <Text style={styles.link}>https://pawssionproject.org.ph</Text>
      </View>
      <View style={styles.bottomMargin}>
        <Text style={styles.textBold}>EMAIL:</Text>
        <Text style={styles.link}>pawssionproject@gmail.com</Text>
      </View>
      <Image style={styles.img} source={require('../../images/about-1.jpg')} />
      <Image style={styles.img} source={require('../../images/about-2.jpg')} />
      <Image style={styles.img} source={require('../../images/about-3.jpg')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  textBold: {
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
  },
  bottomMargin: {
    marginBottom: 10,
  },
  img: {
    height: 300,
    width: '100%',
  },
});

export default About;
