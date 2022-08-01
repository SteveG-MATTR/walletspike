import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';

const DetailScreen = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <SharedElement id="1234">
        <Image
          style={styles.detailImage}
          resizeMode="contain"
          source={require('assets/NZPassportBack.png')}
        />
      </SharedElement>
      <Text>DetailScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  detailImage: {},
});

export default DetailScreen;
