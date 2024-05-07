import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    color: 'white',
    fontSize: 18,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.tab}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
