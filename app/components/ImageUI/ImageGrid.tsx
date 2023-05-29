import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import colors from '../../utils/colors';
import {hp, wp, wpp} from '../../utils/config';
import {imageGridStyles} from '../../utils/defaultStyles';

type Props = {
  idX: number;
  scrollX: SharedValue<number>;
  width: SharedValue<number>;
  idY: number;
  scrollY: SharedValue<number>;
  height: SharedValue<number>;
  totalItemX: number;
  totalItemY: number;
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
  //   const imageBAnimate = useAnimatedStyle(() => {
  //     const translateX = interpolate(
  //       scrollX.value,
  //       [-width.value, 0 + id * WIDTH, width.value],
  //       [-80, 0, 80],
  //       {
  //         extrapolateLeft: Extrapolate.CLAMP,
  //         extrapolateRight: Extrapolate.CLAMP,
  //       },
  //     );
  //     const translateY = interpolate(
  //       scrollY.value,
  //       [0 + idY * 50, height.value],
  //       [0, -1000],
  //       {
  //         // extrapolateLeft: Extrapolate.CLAMP,
  //         // extrapolateRight: Extrapolate.CLAMP,
  //       },
  //     );
  //     return {
  //       transform: [{translateX}, {translateY}],
  //     };
  //   }, []);
  return (
    <View style={styles.container}>
      <View style={styles.typeAContainer}>
        <View
          style={[styles.imageContainer, imageGridStyles.imageTypeADimension]}>
          <Animated.View style={imageBAnimate}>
            <Image
              source={require('../../assets/images/mixed/chair4.png')}
              style={[imageGridStyles.imageTypeADimension]}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
        <Text style={imageGridStyles.title}>Product A</Text>
      </View>

      <View style={styles.typeBContainer}>
        <View
          style={[styles.imageContainer, imageGridStyles.imageTypeBDimension]}>
          <Animated.View style={imageAAnimate}>
            <Image
              source={require('../../assets/images/mixed/cabinet.png')}
              style={imageGridStyles.imageTypeBDimension}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
        <Text style={imageGridStyles.title}>Product B</Text>
      </View>
      <View style={styles.typeCContainer}>
        <View
          style={[styles.imageContainer, imageGridStyles.imageTypeCDimension]}>
          <Animated.View style={imageAAnimate}>
            <Image
              source={require('../../assets/images/mixed/table2.png')}
              style={imageGridStyles.imageTypeCDimension}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
        <Text style={imageGridStyles.title}>Product C</Text>
      </View>
      <View style={styles.typeDContainer}>
        <View
          style={[styles.imageContainer, imageGridStyles.imageTypeDDimension]}>
          <Animated.View style={imageBAnimate}>
            <Image
              source={require('../../assets/images/mixed/tableset.png')}
              style={imageGridStyles.imageTypeDDimension}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
        <Text style={imageGridStyles.title}>Product D</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(75),
    height: hp(40),
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
