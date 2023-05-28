import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import SplashScreen from './app/screens/SplashScreen';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <SplashScreen />
    </SafeAreaProvider>
  );
}

export default App;
