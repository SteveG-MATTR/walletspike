import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import ListScreen from 'src/screens/ListScreen';
import DetailScreen from 'src/screens/DetailScreen';
import MenuScreen from 'src/screens/MenuScreen';
import AnimOneScreen from 'src/screens/AnimOneScreen';
import AnimTwoScreen from 'src/screens/AnimTwoScreen';
import AnimThreeScreen from 'src/screens/AnimThreeScreen';

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
        initialRouteName="Menu"
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
        <RootStack.Screen
          name="Menu"
          component={MenuScreen}
          options={{headerShown: true}}
        />
        <RootStack.Screen name="Anim1" component={AnimOneScreen} />
        <RootStack.Screen name="Anim2" component={AnimTwoScreen} />
        <RootStack.Screen name="Anim3" component={AnimThreeScreen} />

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
