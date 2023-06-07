import React, {useMemo} from 'react';
import {
  Pressable,
  ShadowStyleIOS,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Animated, {
  EntryAnimationsValues,
  EntryExitAnimationFunction,
  FadeInUp,
  Layout,
  withSpring,
} from 'react-native-reanimated';

import colors from '../../utils/colors';
import {fp, hp, hpp, wp, wpp} from '../../utils/config';
import {FONT_TYPES} from '../../utils/style';

type Props = {
  title: string;
  onPress: () => void;
  reverse?: boolean;
};

type StyleProps = {
  container: ViewStyle;
  title: TextStyle;
  shadow: ShadowStyleIOS;
};

const EXTRA_WIDTH = wp(20);
const EXTRA_HEIGHT = hp(10);

export default function ButtonUI({
  title,
  onPress,
  reverse = false,
}: Props): JSX.Element {
  const entering: EntryExitAnimationFunction = (
    values: EntryAnimationsValues,
  ) => {
    'worklet';
    const animations = {
      width: withSpring(values.targetWidth),
      height: withSpring(values.targetHeight),
      originX: withSpring(values.targetOriginX),
      originY: withSpring(values.targetOriginY),
    };
    const initialValues = {
      width: values.targetWidth + EXTRA_WIDTH,
      height: values.targetHeight + EXTRA_HEIGHT,
      originX: -EXTRA_WIDTH / 2,
      originY: -EXTRA_HEIGHT / 2,
    };
    return {
      initialValues,
      animations,
    };
  };

  const reverseStyle = useMemo<StyleProps>(() => {
    return {
      container: {
        backgroundColor: reverse ? colors.bg : colors.primary,
      },
      title: {
        color: reverse ? colors.primary : colors.bg,
      },
      shadow: {
        shadowColor: reverse ? colors.bg : colors.primary,
      },
    };
  }, [reverse]);

  return (
    <Pressable onPress={onPress} style={[styles.shadow, reverseStyle.shadow]}>
      <Animated.View
        style={[styles.container, reverseStyle.container]}
        entering={entering}>
        <Animated.Text
          layout={Layout}
          entering={FadeInUp.delay(300)}
          style={[styles.title, reverseStyle.title]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: hpp(25),
    height: hpp(50),
    minWidth: wpp(220),
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  shadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    fontSize: fp(18),
    fontFamily: FONT_TYPES.W_500,
    color: colors.bg,
    letterSpacing: 1,
  },
});
