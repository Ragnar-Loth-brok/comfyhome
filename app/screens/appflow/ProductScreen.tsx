import React, {useCallback, useState} from 'react';
import {View, Text, StatusBar, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Container from '../../components/common/Container';
import {RootStackParamList} from '../../utils/globalTypes';
import ButtonUI from '../../components/common/ButtonUI';
import BackIcon from '../../assets/icons/back.svg';
import HeartOutlineIcon from '../../assets/icons/heart-outline.svg';
import HeartFillIcon from '../../assets/icons/heart.svg';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import data from '../../utils/dummyProductDetails';
import {hp, wp} from '../../utils/config';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import colors from '../../utils/colors';

const SWIPE_HEIGHT = hp(50);
const CONTAINER_VIEW_INIT_HEIGHT = hp(85);
const CONTAINER_VIEW_FINAL_HEIGHT = hp(35);
const IMAGE_FINAL_HEIGHT = hp(30);

export default function ProductScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [liked, setLiked] = useState(false);

  const sharedValue = useSharedValue(0);
  const position = useSharedValue(0);

  const homeNavigation = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const goBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const toggleLike = useCallback(() => {
    setLiked(boolVal => !boolVal);
  }, []);

  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      if (
        sharedValue.value === 0 &&
        e.translationY < 0 &&
        e.translationY > -SWIPE_HEIGHT
      ) {
        position.value = withSpring(e.translationY);
      } else if (
        sharedValue.value === 1 &&
        e.translationY > 0 &&
        e.translationY < SWIPE_HEIGHT
      ) {
        position.value = withSpring(-SWIPE_HEIGHT + e.translationY);
      }
    })
    .onEnd(e => {
      if (
        sharedValue.value === 0 &&
        // e.translationY < 0 &&
        e.translationY < -SWIPE_HEIGHT / 2
      ) {
        position.value = withSpring(-SWIPE_HEIGHT);
        sharedValue.value = 1;
      } else if (
        sharedValue.value === 1 &&
        // e.translationY > 0 &&
        e.translationY > SWIPE_HEIGHT / 2
      ) {
        position.value = withSpring(0);
        sharedValue.value = 0;
      } else {
        if (sharedValue.value === 1) {
          position.value = withSpring(-SWIPE_HEIGHT);
        } else {
          position.value = withSpring(0);
        }
      }
    });

  const animateContainerView = useAnimatedStyle(() => {
    const height = interpolate(
      position.value,
      [0, -SWIPE_HEIGHT],
      [CONTAINER_VIEW_INIT_HEIGHT, CONTAINER_VIEW_FINAL_HEIGHT],
    );
    return {
      height,
    };
  }, []);

  const animateImageView = useAnimatedStyle(() => {
    const height = interpolate(
      position.value,
      [0, -SWIPE_HEIGHT],
      [SWIPE_HEIGHT, IMAGE_FINAL_HEIGHT],
    );
    return {
      height,
    };
  }, []);

  const animateDetailView = useAnimatedStyle(() => {
    const opacity = interpolate(position.value, [0, -SWIPE_HEIGHT / 2], [1, 0]);
    return {
      opacity,
    };
  }, []);

  return (
    <Container backgroundColor={colors.secondaryBg}>
      <StatusBar animated barStyle="dark-content" hidden={false} />
      <GestureHandlerRootView>
        <View style={styles.parentBg}>
          <Animated.View style={[styles.container, animateContainerView]}>
            <View style={styles.headerContainer}>
              <Pressable onPress={goBack} style={styles.iconContainer}>
                <BackIcon />
              </Pressable>
              <Text>My title</Text>
              <Pressable onPress={toggleLike} style={styles.iconContainer}>
                {liked ? <HeartFillIcon /> : <HeartOutlineIcon />}
              </Pressable>
            </View>
            <View>
              <Animated.Image
                source={data.mixed[7].image}
                style={[animateImageView, styles.imageDimension]}
                resizeMode="contain"
              />
            </View>
            <Animated.View style={[styles.detailsContainer, animateDetailView]}>
              {}
            </Animated.View>
          </Animated.View>
          <Animated.View>
            <GestureDetector gesture={panGesture}>
              <Animated.View style={[styles.purchaseContainer]}>
                {/* <Text>Hey babu</Text> */}
              </Animated.View>
            </GestureDetector>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryBg,
    borderBottomRightRadius: wp(7),
    borderBottomLeftRadius: wp(7),
    overflow: 'hidden',
    // backgroundColor: colors.secondaryBg,
  },
  parentBg: {
    backgroundColor: colors.appBg,
    // backgroundColor: colors.imageCardBg,
    // backgroundColor: colors.appBg,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp(5),
    alignItems: 'center',
  },
  imageDimension: {
    width: wp(100),
  },
  detailsContainer: {
    flex: 1,
  },
  purchaseContainer: {
    height: SWIPE_HEIGHT + hp(20),
  },
  iconContainer: {
    padding: hp(2),
  },
  // likeIconContainer: {
  //   padding: hp(2),
  // },
});
