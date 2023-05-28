import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import colors from '../../utils/colors';
import {hpp} from '../../utils/config';

type Props = {
  borderColor?: string;
};

export default function CircleUI({
  borderColor = colors.borderPrimaryColor,
}: Props): JSX.Element {
  const scale = useSharedValue<number>(1);
  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: withSpring(scale.value)}],
    };
  }, []);

  useEffect(() => {
    scale.value = withRepeat(withTiming(1.1, {duration: 3000}), -1, true);
  });
  return (
    <Animated.View style={[styles.container, {borderColor}, animateStyle]} />
  );
}

const styles = StyleSheet.create({
  container: {
    width: hpp(100),
    height: hpp(100),
    borderRadius: hpp(50),
    borderWidth: 1,
  },
});
