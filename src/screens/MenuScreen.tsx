import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const menuItems = {
  List: 'Credentials',
  Anim1: 'Layout Animation',
  Anim2: 'React Native Animatable',
  Anim3: 'React Native Animated',
};

const MenuScreen = ({navigation}): JSX.Element => {
  const selectMenuItem = screenId => {
    navigation.navigate(screenId);
  };
  return (
    <View style={styles.container}>
      {Object.entries(menuItems).map(menuItem => {
        const [screenId, description] = menuItem;
        return (
          <TouchableOpacity
            key={screenId}
            onPress={() => {
              selectMenuItem(screenId);
            }}>
            <Text style={styles.menuText}>{description}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
  },
  menuText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'grey',
    paddingVertical: 20,
  },
});

export default MenuScreen;
