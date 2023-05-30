import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import colors from '../../utils/colors';
import {fp, hp, wp, wpp} from '../../utils/config';
import {HomeScreenTexts} from '../../utils/string';
import defaultStyles from '../../utils/defaultStyles';
import ImageGrid from './ImageGrid';
import {FONT_TYPES} from '../../utils/style';

type Props = {
  idY: number;
  totalItemY: number;
  scrollY: SharedValue<number>;
  height: SharedValue<number>;
};
const DEVICE_WIDTH = wp(100);

export default function ProductHorizontalScrollUI({
  height,
  scrollY,
  idY,
  totalItemY,
}: Props): JSX.Element {
  const scrollX = useSharedValue(0);
  const contentSize = useSharedValue(DEVICE_WIDTH);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = withSpring(event.contentOffset.x, {damping: 100});
    if (event.contentSize.width > DEVICE_WIDTH) {
      contentSize.value = withSpring(event.contentSize.width - DEVICE_WIDTH);
    }
  });

  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={5}
      onScroll={scrollHandler}
      decelerationRate={0.8}
      style={styles.container}>
      <View style={[{marginLeft: wpp(20)}]}>
        <View style={[defaultStyles.child_center, styles.subContainer]}>
          {HomeScreenTexts.categories[idY]
            .split('')
            .reverse()
            .map((item, index) => (
              <Text key={index} style={styles.title}>
                {item}
              </Text>
            ))}
        </View>
        <View style={styles.dotContainer}>
          {Array.from(Array(50), (_, i) => (
            <View style={styles.dot} key={i} />
          ))}
        </View>
      </View>
      <ImageGrid
        idX={0}
        totalItemX={3}
        scrollX={scrollX}
        width={contentSize}
        height={height}
        scrollY={scrollY}
        idY={idY}
        totalItemY={totalItemY}
      />
      <ImageGrid
        idX={1}
        totalItemX={3}
        scrollX={scrollX}
        width={contentSize}
        height={height}
        scrollY={scrollY}
        idY={idY}
        totalItemY={totalItemY}
      />
      <ImageGrid
        idX={2}
        totalItemX={3}
        scrollX={scrollX}
        width={contentSize}
        height={height}
        scrollY={scrollY}
        idY={idY}
        totalItemY={totalItemY}
      />
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: hp(2),
    height: hp(50),
    overflow: 'hidden',
  },
  subContainer: {
    marginBottom: 5,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 2.5,
    backgroundColor: colors.headingColor,
    marginVertical: 4.6,
  },
  dotContainer: {
    alignItems: 'center',
  },
  title: {
    transform: [{rotateZ: '270deg'}],
    fontSize: fp(12),
    fontFamily: FONT_TYPES.W_400,
  },
});