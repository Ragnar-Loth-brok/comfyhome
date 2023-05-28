import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';

import colors from '../../utils/colors';
import {fp, hpp, wpp} from '../../utils/config';
import {FONT_TYPES} from '../../utils/style';

type Props = {
  title: string;
};

export default function ButtonUI({title}: Props): JSX.Element {
  return (
    <Pressable style={styles.container}>
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
  },
  title: {
    fontSize: fp(18),
    fontFamily: FONT_TYPES.W_500,
    color: colors.appBg,
    letterSpacing: 1,
  },
});
