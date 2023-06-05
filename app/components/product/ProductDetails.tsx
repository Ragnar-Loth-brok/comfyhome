import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  FlipInEasyY,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

import colors from '../../utils/colors';
import {fp, hp, hpp, ProductScreenConstants, wp} from '../../utils/config';
import {FONT_TYPES} from '../../utils/style';

type Props = {
  position: SharedValue<number>;
};

const name = 'Baron Lamp';

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
        <Text style={styles.productType}>Chair cover, Orresta grey</Text>
        <View style={[styles.titleContainer, {alignItems: 'flex-end'}]}>
          <Text style={styles.priceTitle}>Rs.</Text>
          <Text style={styles.priceText}>800</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        {/* <ButtonUI onPress={() => {}} title="Add to Cart" />
        <View style={styles.cartContainer}>
          <Cart />
        </View> */}
        <Text
          numberOfLines={3}
          style={{
            marginLeft: wp(6),
            lineHeight: fp(24),
            fontSize: fp(14),
            color: colors.titlePrimary,
            fontFamily: FONT_TYPES.W_400,
          }}>
          Dining chairs in the BERGMUND series offer cushiony comfort and many
          cover options, like this one in a pale shade of grey. After engaging
          meals and after-dinner chit-chat, it’s good to know it’s washable.
        </Text>
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
    borderLeftWidth: 2,
    marginVertical: hp(3),
    borderColor: colors.border,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: fp(28),
    fontFamily: FONT_TYPES.W_700,
    color: colors.title,
    letterSpacing: 1,
  },
  subTitle: {
    fontSize: fp(26),
    fontFamily: FONT_TYPES.W_400,
    color: colors.titleSecondary,
  },
  priceTitle: {
    fontSize: fp(16),
    fontFamily: FONT_TYPES.W_400,
    color: colors.titleSecondary,
  },
  priceText: {
    fontSize: fp(26),
    fontFamily: FONT_TYPES.W_700,
    color: colors.primary,
    transform: [{translateY: fp(3)}],
    letterSpacing: 1,
  },
  productType: {
    fontSize: fp(16),
    fontFamily: FONT_TYPES.W_400,
    color: colors.titlePrimary,
    marginVertical: hpp(9),
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  cartContainer: {
    backgroundColor: colors.bg,
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
