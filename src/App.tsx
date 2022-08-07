import 'react-native-gesture-handler';
import React from 'react';
import {UIManager} from 'react-native';
import AppNavigation from 'src/navigation/AppNavigation';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App = (): JSX.Element => {
  return <AppNavigation />;
};

export default App;
