import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {TransitionPresets} from '@react-navigation/stack';
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
          transitionSpec: {
            open: iosTransitionSpec,
            close: iosTransitionSpec,
          },
          // cardStyleInterpolator: ({current: {progress}}) => ({
          //   cardStyle: {
          //     opacity: progress,
          //   },
          // }),
        }}>
        <RootStack.Screen
          name="List"
          component={ListScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Detail"
          component={DetailScreen}
          sharedElements={(route, otherRoute, showing) => {
            return [{id: '1234', animation: 'fade'}];
            // const {id} = route.params;
            // console.log('nav id', id);
            // if (route.name === 'Details' && showing) {
            //   return [id];
            // } else {
            //   return [id];
            // }
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
