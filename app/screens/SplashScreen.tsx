import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import colors from '../utils/colors';
import {fp, hp, hpp, wp, wpp} from '../utils/config';
import {SplashScreenTexts} from '../utils/string';
import {FONT_TYPES} from '../utils/style';

import ButtonUI from '../components/common/ButtonUI';
import Container from '../components/common/Container';
import CircleUI from '../components/UI/CircleUI';

const CIRCLE_X = hpp(150);
const SWIPE_LIMIT = wp(40);
const LAMP_X = wp(65);
const CHAIR_X = -wp(100);
const CHAIR_X_INIT = wp(18);
const CHAIR_2_INIT = wp(165);
const CHAIR_2 = wp(35);

export default function SplashScreen(): JSX.Element {
  const sharedValue = useSharedValue(0);
  const position = useSharedValue(SWIPE_LIMIT);
  const productPosition = useSharedValue(SWIPE_LIMIT);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      position.value = withSpring(e.translationX);
      if (
        e.translationX > SWIPE_LIMIT / 2 ||
        e.translationX < -SWIPE_LIMIT / 2
      ) {
        productPosition.value = withSpring(e.translationX);
      }
    })
    .onEnd(e => {
      if (e.translationX > SWIPE_LIMIT && sharedValue.value === 1) {
        position.value = withSpring(SWIPE_LIMIT);
        productPosition.value = withSpring(SWIPE_LIMIT);
        sharedValue.value = 0;
      } else if (e.translationX < -SWIPE_LIMIT && sharedValue.value === 0) {
        position.value = withSpring(-SWIPE_LIMIT);
        productPosition.value = withSpring(-SWIPE_LIMIT);
        sharedValue.value = 1;
      } else {
        if (sharedValue.value === 0) {
          position.value = withSpring(SWIPE_LIMIT);
          productPosition.value = withSpring(SWIPE_LIMIT);
        } else {
          position.value = withSpring(-SWIPE_LIMIT);
          productPosition.value = withSpring(-SWIPE_LIMIT);
        }
      }
    });

  const centerCircleAnimation = useAnimatedStyle(() => {
    const translateX = interpolate(
      position.value,
      [SWIPE_LIMIT, 0, -SWIPE_LIMIT],
      [CIRCLE_X, 0, -CIRCLE_X],
    );
    return {
      transform: [{translateX}],
    };
  }, []);

  const lampAnimation = useAnimatedStyle(() => {
    const translateX = interpolate(
      productPosition.value,
      [SWIPE_LIMIT, -SWIPE_LIMIT],
      [LAMP_X, 0],
      {
        // extrapolateLeft: Extrapolate.CLAMP,
        // extrapolateRight: Extrapolate.CLAMP,
      },
    );

    return {
      transform: [{translateX}],
    };
  }, []);

  const chairAnimation = useAnimatedStyle(() => {
    const translateX = interpolate(
      productPosition.value,
      [SWIPE_LIMIT, -SWIPE_LIMIT],
      [CHAIR_X_INIT, CHAIR_X],
      {
        // extrapolateLeft: Extrapolate.CLAMP,
        // extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      transform: [{translateX}],
    };
  }, []);

  const chair2Animation = useAnimatedStyle(() => {
    const translateX = interpolate(
      productPosition.value,
      [SWIPE_LIMIT, -SWIPE_LIMIT],
      [CHAIR_2_INIT, CHAIR_2],
      {
        // extrapolateLeft: Extrapolate.CLAMP,
        // extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      transform: [{translateX}],
    };
  }, []);

  return (
    <Container>
      <GestureHandlerRootView>
        <StatusBar hidden={true} />
        <View style={styles.subContainer}>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>{SplashScreenTexts.heading}</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.title}>{SplashScreenTexts.title}</Text>
        </View>
        <View style={styles.cicleUIContainer}>
          <CircleUI />
        </View>
        <GestureDetector gesture={panGesture}>
          <View style={styles.box}>
            <Animated.View
              style={[styles.centerCircle, centerCircleAnimation]}
            />
            <Animated.View style={[styles.chairImageContainer, chairAnimation]}>
              <Image
                source={require('../assets/images/products/chairs/chair2.png')}
                style={styles.chair1Image}
              />
            </Animated.View>
            <Animated.View
              style={[styles.chairImageContainer, chair2Animation]}>
              <Image
                source={require('../assets/images/products/chairs/chair3.png')}
                style={styles.chair2Image}
              />
            </Animated.View>
            <Animated.View style={[styles.lampImageContainer, lampAnimation]}>
              <Image
                source={require('../assets/images/products/lamps/lamp.png')}
                style={styles.lampImage}
              />
            </Animated.View>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
      <View style={styles.buttonContainer}>
        <ButtonUI title="Get Started" />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    transform: [{translateX: -wpp(50)}],
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: colors.textPrimary,
    marginHorizontal: 15,
    borderRadius: 5,
  },
  headingContainer: {
    transform: [{rotateZ: '270deg'}],
  },
  heading: {
    fontSize: fp(16),
    fontFamily: FONT_TYPES.W_500,
    transform: [{translateY: wpp(90)}],
    color: colors.headingColor,
  },
  title: {
    fontSize: fp(32),
    fontFamily: FONT_TYPES.W_500,
    color: colors.textSecondary,
  },
  cicleUIContainer: {
    position: 'absolute',
    right: -hpp(30),
    top: -hpp(20),
  },
  box: {
    height: hp(80),
  },
  centerCircle: {
    width: hpp(500),
    height: hpp(500),
    backgroundColor: colors.circleBg,
    borderRadius: hpp(250),
  },
  chairImageContainer: {
    position: 'absolute',
    top: hp(20),
  },
  chair1Image: {
    width: wp(51),
    height: hp(30),
    minHeight: wp(50),
  },
  chair2Image: {
    width: wp(60),
    height: hp(32),
  },
  lampImage: {
    width: wp(35),
    height: hp(40),
  },
  lampImageContainer: {
    position: 'absolute',
    top: hp(15),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: hp(4),
    alignSelf: 'center',
  },
});
