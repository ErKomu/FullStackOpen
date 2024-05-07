import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0366d6',
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  text: {
    color: 'white',
    fontSize: 12,
  },
});

const LanguageTag = ({ language }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{language}</Text>
    </View>
  );
};

export default LanguageTag;
