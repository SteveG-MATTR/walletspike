import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ListScreen from 'src/screens/ListScreen';
import DetailScreen from 'src/screens/DetailScreen';

export const iosTransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 10,
    restSpeedThreshold: 10,
  },
};

const RootStack = createSharedElementStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="List"
        screenOptions={{
          headerShown: false,
          transitionSpec: {
            open: iosTransitionSpec,
            close: iosTransitionSpec,
          },
          cardStyleInterpolator: ({current: {progress}}) => ({
            cardStyle: {
              opacity: progress,
            },
          }),
        }}>
        <RootStack.Screen name="List" component={ListScreen} />
        <RootStack.Screen
          name="Detail"
          component={DetailScreen}
          sharedElements={(route, _otherRoute, _showing) => {
            const {item} = route.params;
            return [{id: item.id, animation: 'fade'}];
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
