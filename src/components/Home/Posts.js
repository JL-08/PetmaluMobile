import React from 'react';
import {Text, View, ImageBackground} from 'react-native';

const Posts = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <ImageBackground
        source={require('../../images/background.png')}
        style={{
          resizeMode: 'cover',
          flex: 1,
        }}>
        <Text>Posts</Text>
      </ImageBackground>
    </View>
  );
};

export default Posts;
