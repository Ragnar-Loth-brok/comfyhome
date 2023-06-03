import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {RootStackParamList} from '../utils/globalTypes';

import HomeScreen from '../screens/appflow/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import ProductScreen from '../screens/appflow/ProductScreen';

const Stack = createStackNavigator<RootStackParamList>();
const SharedElementStack = createSharedElementStackNavigator();

function SharedElementNavigation(): JSX.Element {
  return (
    <SharedElementStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        // ...TransitionPresets.ScaleFromCenterAndroid,
      }}>
      <SharedElementStack.Screen name="Home" component={HomeScreen} />
      <SharedElementStack.Screen
        name="Product"
        component={ProductScreen}
        sharedElements={route => {
          const {item} = route.params;
          return [{id: `${item.uid}`, animation: 'move'}];
        }}
      />
    </SharedElementStack.Navigator>
  );
}

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
