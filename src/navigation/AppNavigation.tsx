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
        <RootStack.Screen name="List" component={ListScreen} />
        <RootStack.Screen
          name="Detail"
          component={DetailScreen}
          sharedElementsConfig={(route, otherRoute, showing) => {
            // const {item} = route.params;
            if (route.name === 'Details' && showing) {
              // Open animation fades in image, title and description
              return [
                {
                  id: '1234',
                },
                // {
                //   id: `item.${item.id}.title`,
                //   animation: "fade",
                //   resize: "clip",
                //   align: "left-top",
                // },
                // {
                //   id: `item.${item.id}.description`,
                //   animation: "fade",
                //   resize: "clip",
                //   align: "left-top",
                // },
              ];
            } else {
              // Close animation only fades out image
              return [
                {
                  id: '1234',
                },
              ];
            }
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
