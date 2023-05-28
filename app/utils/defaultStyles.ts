import {StyleSheet} from 'react-native';
import {ICON_SF} from './config';

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
});
