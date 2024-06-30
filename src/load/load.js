import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Load = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#0B5345" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Load;