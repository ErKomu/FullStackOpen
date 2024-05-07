import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
});

const Logo = ({ source }) => {
  return (
    <View>
      <Image source={{
          uri: {source}.source,
        }} style={styles.logo}/>
    </View>
  );
};

export default Logo;
