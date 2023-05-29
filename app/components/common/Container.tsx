import React from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../utils/colors';

type Props = PropsWithChildren<{
  backgroundColor?: string;
}>;

export default function Container({
  children,
  backgroundColor = colors.appBgPrimary,
}: Props): JSX.Element {
  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.appBg,
    flex: 1,
  },
});
