import {StyleSheet} from 'react-native';
import colors from './colors';
import {ICON_SF, fp, wp, hp} from './config';
import {FONT_TYPES} from './style';

export default StyleSheet.create({
  svg_scale: {
    transform: [{scale: ICON_SF}],
  },
  child_center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  self_center: {
    alignSelf: 'center',
  },
  headingStyleA: {
    fontSize: fp(32),
    fontFamily: FONT_TYPES.W_500,
    color: colors.primary,
  },
  headingStyleB: {
    fontSize: fp(32),
    fontFamily: FONT_TYPES.W_400,
    color: colors.primary,
  },
});

export const imageGridStyles = StyleSheet.create({
  title: {
    fontSize: fp(14),
    fontFamily: FONT_TYPES.W_400,
    color: colors.titlePrimary,
    marginVertical: 5,
    marginLeft: 5,
    letterSpacing: 1,
  },
  imageTypeADimension: {
    width: wp(35),
    height: hp(10),
  },
  imageTypeBDimension: {
    width: wp(45),
    height: hp(22),
  },
  imageTypeCDimension: {
    width: wp(35),
    height: hp(22),
  },
  imageTypeDDimension: {
    width: wp(45),
    height: hp(10),
  },
  cardShadow: {
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
