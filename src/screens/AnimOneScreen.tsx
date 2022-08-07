import React, {useState} from 'react';
import {View, StyleSheet, LayoutAnimation, Image, Button} from 'react-native';

const items = {
  kitten1: require('assets/kitten1.jpeg'),
  kitten2: require('assets/kitten2.jpeg'),
  kitten3: require('assets/kitten3.jpeg'),
};

const AnimOneScreen = (): JSX.Element => {
  const [pressed, setPressed] = useState(false);
  return (
    <View style={styles.container}>
      <Button
        title="Toggle"
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setPressed(!pressed);
        }}
      />
      <View style={{flexDirection: pressed ? 'column-reverse' : 'column'}}>
        {Object.entries(items).map(item => {
          const [id, imageSource] = item;
          return <Image key={id} source={imageSource} />;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
});

export default AnimOneScreen;
