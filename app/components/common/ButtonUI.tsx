import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

import colors from '../../utils/colors';
import {fp, hpp, wpp} from '../../utils/config';
import {FONT_TYPES} from '../../utils/style';

type Props = {
  title: string;
  onPress: () => void;
};

export default function ButtonUI({title, onPress}: Props): JSX.Element {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonBG,
    borderRadius: hpp(25),
    height: hpp(50),
    minWidth: wpp(200),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  title: {
    fontSize: fp(18),
    fontFamily: FONT_TYPES.W_500,
    color: colors.appBg,
    letterSpacing: 1,
  },
});
