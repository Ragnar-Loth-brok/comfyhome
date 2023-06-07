import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInRight,
  FlipInXDown,
  Layout,
  ZoomIn,
} from 'react-native-reanimated';

import Cart from '../../assets/icons/cart.svg';
import ButtonUI from '../common/ButtonUI';

import colors from '../../utils/colors';
import {fp, hp, hpp, wp} from '../../utils/config';
import {FONT_TYPES} from '../../utils/style';
import {ProductType} from '../../utils/globalTypes';

type Props = {
  product?: ProductType;
};

export default function ProductMoreDetails({product}: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <View>
        <Animated.View
          layout={Layout}
          entering={ZoomIn.springify().delay(350)}
          style={styles.titleContainer}>
          <Text style={styles.boldTitle}>{product?.name.split(' ')[0]} </Text>
          <Text style={styles.title}>
            {product?.name
              .split(' ')
              .filter((_, index) => index !== 0)
              .join(' ')}
          </Text>
        </Animated.View>
        <Animated.View layout={Layout} style={styles.articleContainer}>
          <Animated.Text
            entering={FadeInRight.delay(350)}
            style={styles.articleText}>
            Article Number
          </Animated.Text>
          <Animated.View
            layout={Layout}
            entering={FadeInLeft.springify().delay(350)}
            style={styles.acNumberContainer}>
            <Text style={styles.acNumberText}>{product?.uid}</Text>
          </Animated.View>
        </Animated.View>
        <Animated.Text
          layout={Layout}
          entering={FadeInRight.delay(350)}
          style={styles.desc}>
          {product?.short_desc}
        </Animated.Text>
      </View>
      <Animated.View
        layout={Layout}
        entering={FlipInXDown.delay(350)}
        style={styles.buttonContainer}>
        <ButtonUI reverse onPress={() => {}} title="Add to Bag" />
        <View style={styles.cartContainer}>
          <Cart />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(8),
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: hp(20),
  },
  titleContainer: {
    flexDirection: 'row',
    marginVertical: hp(2),
  },
  boldTitle: {
    color: colors.bg,
    fontSize: fp(25),
    fontFamily: FONT_TYPES.W_500,
  },
  title: {
    color: colors.bg,
    fontSize: fp(25),
    fontFamily: FONT_TYPES.W_200,
  },
  articleContainer: {
    flexDirection: 'row',
    marginVertical: hp(2),
    justifyContent: 'space-between',
  },
  articleText: {
    color: colors.bg,
    fontSize: fp(16),
    fontFamily: FONT_TYPES.W_500,
    lineHeight: fp(22),
  },
  acNumberContainer: {
    backgroundColor: colors.bg,
    paddingHorizontal: 10,
    borderRadius: 10,
    shadowColor: colors.bg,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  acNumberText: {
    color: colors.primary,
    fontSize: fp(16),
    fontFamily: FONT_TYPES.W_500,
    lineHeight: fp(22),
  },
  desc: {
    color: colors.bg,
    fontSize: fp(16),
    fontFamily: FONT_TYPES.W_400,
    lineHeight: fp(22),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartContainer: {
    backgroundColor: colors.bg,
    borderRadius: hp(5),
    width: hpp(42),
    height: hpp(42),
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    shadowColor: colors.bg,
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
});
