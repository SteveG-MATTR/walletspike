import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const MyTest = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>MyTest</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: 200,
    height: 150,
    backgroundColor: 'hotpink',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyTest;
