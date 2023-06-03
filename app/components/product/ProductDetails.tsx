import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {ProductScreenConstants} from '../../utils/config';

type Props = {
  position: SharedValue<number>;
};

export default function ProductDetails({position}: Props) {
  const animateDetailView = useAnimatedStyle(() => {
    const opacity = interpolate(
      position.value,
      [0, -ProductScreenConstants.SWIPE_HEIGHT / 2],
      [1, 0],
    );
    return {
      opacity,
    };
  }, []);

  return (
    <Animated.View style={[styles.detailsContainer, animateDetailView]}>
      <View style={{paddingHorizontal: 20, borderLeftWidth: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Text>Baron </Text>
          <Text>Lamp</Text>
        </View>
        <Text>Size</Text>
        <Text>160 x 75 x 55.5 com</Text>
      </View>
      <Text style={{marginHorizontal: 20}}>
        With this floor lamp you enjoy overhead lighting – with no ceiling
        outlet. And since you can slide the lamp base under a sofa, it takes up
        little floor space. A smart and flexible solution, right?
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
