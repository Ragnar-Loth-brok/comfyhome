import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {RootStackParamList} from '../utils/globalTypes';

import HomeScreen from '../screens/appflow/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import ProductScreen from '../screens/appflow/ProductScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
}
