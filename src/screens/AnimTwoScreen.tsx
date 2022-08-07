import React, {useState} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimTwoScreen = (): JSX.Element => {
  const [pressed, setPressed] = useState(false);
  return (
    <View style={styles.container}>
      <Animatable.Text
        animation="pulse"
        iterationCount={100}
        style={styles.text}>
        Pulsing Text
      </Animatable.Text>
      <Animatable.View
        animation={!pressed ? 'zoomIn' : 'zoomOut'}
        style={[styles.circle, {backgroundColor: 'teal'}]}
      />
      <Animatable.View
        animation={!pressed ? 'slideInLeft' : 'slideOutRight'}
        style={[styles.circle, {backgroundColor: 'blue'}]}
      />
      <Animatable.View
        animation={!pressed ? 'slideInRight' : 'slideOutLeft'}
        style={[styles.circle, {backgroundColor: 'cyan'}]}
      />
      <Button
        title="Press me"
        onPress={() => {
          setPressed(!pressed);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  circle: {
    backgroundColor: 'grey',
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 10,
  },
});

export default AnimTwoScreen;
