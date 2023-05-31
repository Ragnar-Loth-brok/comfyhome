import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  Layout,
  SharedValue,
  useAnimatedStyle,
  ZoomIn,
} from 'react-native-reanimated';
import colors from '../../utils/colors';
import {hp, wp, wpp} from '../../utils/config';
import {imageGridStyles} from '../../utils/defaultStyles';
import {ProuctType} from '../../utils/globalTypes';

type Props = {
  idX: number;
  scrollX: SharedValue<number>;
  width: SharedValue<number>;
  idY: number;
  scrollY: SharedValue<number>;
  height: SharedValue<number>;
  totalItemX: number;
  totalItemY: number;
  products: ProuctType[];
};

const SLIDEX = 30;
const SLIDEY = 30;
const SLIDEY_B = 15;

export default function ImageGrid({
  idX,
  scrollX,
  width,
  height,
  idY,
  scrollY,
  totalItemX,
  totalItemY,
  products,
}: Props): JSX.Element {
  const imageAAnimate = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [0, width.value],
      [0 + idX * SLIDEX, -(totalItemX - idX - 1) * SLIDEX],
    );
    const translateY = interpolate(
      scrollY.value,
      [0, height.value],
      [0 + idY * SLIDEY, -(totalItemY - idY - 1) * SLIDEY],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      transform: [{translateX}, {translateY}],
    };
  }, []);
  const imageBAnimate = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [0, width.value],
      [0 + idX * SLIDEX, -(totalItemX - idX - 1) * SLIDEX],
    );
    const translateY = interpolate(
      scrollY.value,
      [0, height.value],
      [0 + idY * SLIDEY_B, -(totalItemY - idY - 1) * SLIDEY_B],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      transform: [{translateX}, {translateY}],
    };
  }, []);
  return (
    <View style={styles.container}>
      {products[0] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(200).springify()}
          style={styles.typeAContainer}>
          <View
            style={[
              styles.imageContainer,
              imageGridStyles.imageTypeADimension,
            ]}>
            <Animated.View style={imageBAnimate}>
              <Image
                source={products[0].image}
                style={[imageGridStyles.imageTypeADimension]}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
          <Text style={imageGridStyles.title}>{products[0].name}</Text>
        </Animated.View>
      )}

      {products[1] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(500).springify()}
          style={styles.typeBContainer}>
          <View
            style={[
              styles.imageContainer,
              imageGridStyles.imageTypeBDimension,
            ]}>
            <Animated.View style={imageAAnimate}>
              <Image
                source={products[1].image}
                style={imageGridStyles.imageTypeBDimension}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
          <Text style={imageGridStyles.title}>{products[1].name}</Text>
        </Animated.View>
      )}
      {products[2] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(700).springify()}
          style={styles.typeCContainer}>
          <View
            style={[
              styles.imageContainer,
              imageGridStyles.imageTypeCDimension,
            ]}>
            <Animated.View style={imageAAnimate}>
              <Image
                source={products[2].image}
                style={imageGridStyles.imageTypeCDimension}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
          <Text style={imageGridStyles.title}>{products[2].name}</Text>
        </Animated.View>
      )}
      {products[3] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(300).springify()}
          style={styles.typeDContainer}>
          <View
            style={[
              styles.imageContainer,
              imageGridStyles.imageTypeDDimension,
            ]}>
            <Animated.View style={imageBAnimate}>
              <Image
                source={products[3].image}
                style={imageGridStyles.imageTypeDDimension}
                resizeMode="contain"
              />
            </Animated.View>
          </View>
          <Text style={imageGridStyles.title}>{products[3].name}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(85),
    height: hp(41),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wpp(20),
  },
  imageContainer: {
    backgroundColor: colors.imageCardBg,
    borderRadius: wp(5),
    overflow: 'hidden',
  },

  typeAContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  typeBContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  typeCContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  typeDContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
