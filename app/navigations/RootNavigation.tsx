import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

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
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          animationEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          animationEnabled: true,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
      />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
}
