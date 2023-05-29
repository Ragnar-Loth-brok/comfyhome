import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Container from '../../components/common/Container';
import {RootStackParamList} from '../../utils/globalTypes';
import colors from '../../utils/colors';
import {hp, wp, wpp} from '../../utils/config';
import {HomeScreenTexts} from '../../utils/string';
import defaultStyles from '../../utils/defaultStyles';
import ProductHorizontalScrollUI from '../../components/ImageUI/ProductHorizontalScrollUI';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const DEVICE_HEIGHT = hp(100);

export default function HomeScreen(): JSX.Element {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const productNavigation = useCallback(() => {
    navigation.navigate('Product');
  }, [navigation]);

  const scrollY = useSharedValue(0);
  const contentSize = useSharedValue(hp(100));

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = withSpring(event.contentOffset.y, {damping: 100});
    contentSize.value = withSpring(event.contentSize.height - DEVICE_HEIGHT);
  });

  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={10}
      style={{backgroundColor: colors.appBgPrimary}}>
      <Container>
        <View style={styles.container}>
          <View style={styles.menuContainer}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
          <View style={styles.headingContainer}>
            <Text style={defaultStyles.headingStyleA}>
              {HomeScreenTexts.headingA}
            </Text>
            <Text style={defaultStyles.headingStyleB}>
              {HomeScreenTexts.headingB}
            </Text>
          </View>
        </View>

        <ProductHorizontalScrollUI
          height={contentSize}
          idY={0}
          scrollY={scrollY}
          totalItemY={2}
        />
        <ProductHorizontalScrollUI
          height={contentSize}
          idY={1}
          scrollY={scrollY}
          totalItemY={2}
        />
      </Container>
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: wpp(20),
  },
  headingContainer: {
    marginVertical: hp(4),
    borderLeftWidth: 2,
    borderColor: colors.headingColor,
    paddingHorizontal: 20,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.headingColor,
    // marginRight: 2,
  },
  menuContainer: {
    flexDirection: 'row',
    width: 15,
    height: 15,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    rowGap: 4,
    columnGap: 4,
  },
});
