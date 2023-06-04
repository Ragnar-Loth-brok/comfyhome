import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  FlipInEasyY,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Cart from '../../assets/icons/cart.svg';
import colors from '../../utils/colors';
import {fp, hp, hpp, ProductScreenConstants, wp, wpp} from '../../utils/config';
import {FONT_TYPES} from '../../utils/style';
import ButtonUI from '../common/ButtonUI';

type Props = {
  position: SharedValue<number>;
};

const name = 'Hey brother hello';

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
    <Animated.View
      entering={FlipInEasyY.springify()}
      style={[styles.detailsContainer, animateDetailView]}>
      <View style={styles.subContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name.split(' ')[0]} </Text>
          <Text style={styles.subTitle}>
            {name
              .split(' ')
              .filter((_, index) => index !== 0)
              .join(' ')}
          </Text>
        </View>
        <Text style={styles.dimensionTitle}>Size</Text>
        <Text style={styles.dimensionText}>160 x 75 x 55.5 cm</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonUI onPress={() => {}} title="Add to Cart" />
        <View style={styles.cartContainer}>
          <Cart />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    marginHorizontal: wp(4),
    paddingHorizontal: wp(4),
  },
  subContainer: {
    paddingHorizontal: wp(6),
    borderLeftWidth: 1.5,
    marginVertical: hp(3),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fp(28),
    fontFamily: FONT_TYPES.W_700,
    color: colors.titlePrimary,
  },
  subTitle: {
    fontSize: fp(26),
    fontFamily: FONT_TYPES.W_400,
    color: colors.textSecondary,
  },
  dimensionText: {
    fontSize: fp(19),
    fontFamily: FONT_TYPES.W_400,
    color: colors.textSecondary,
  },
  dimensionTitle: {
    fontSize: fp(16),
    fontFamily: FONT_TYPES.W_400,
    color: colors.headingColor,
    marginVertical: hpp(8),
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cartContainer: {
    backgroundColor: colors.appBgPrimary,
    borderRadius: hp(5),
    width: hpp(42),
    height: hpp(42),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    transform: [{perspective: 500}],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
});
