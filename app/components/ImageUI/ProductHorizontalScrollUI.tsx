import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {hp, wp} from '../../utils/config';
import ImageGrid from './ImageGrid';

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
      style={styles.container}
      contentContainerStyle={
        {
          // paddingLeft: wpp(20),
        }
      }>
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
    marginVertical: hp(5),
  },
});
