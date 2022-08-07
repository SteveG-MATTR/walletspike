import React, {useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

const AnimThreeScreen = (): JSX.Element => {
  const yOffset = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    Animated.spring(yOffset, {
      friction: 1,
      useNativeDriver: true,
    }).start();
  }, [yOffset]);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Animated.spring(yOffset, {
          toValue: Math.random() * 600 - 300,
          friction: 2,
          useNativeDriver: true,
        }).start();
      }}>
      <View style={styles.container}>
        <Animated.Image
          source={require('assets/kitten1.jpeg')}
          style={[
            styles.image,
            {
              transform: [{translateY: yOffset}],
            },
          ]}
          resizeMode="contain"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'salmon',
    padding: 50,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});

export default AnimThreeScreen;
