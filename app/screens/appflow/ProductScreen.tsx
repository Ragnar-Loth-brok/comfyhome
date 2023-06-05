/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Pressable,
  StyleSheet,
  Modal,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Container from '../../components/common/Container';
import {
  Dimensions,
  ImageDimensions,
  ProductType,
  RootStackParamList,
} from '../../utils/globalTypes';
import BackIcon from '../../assets/icons/back.svg';
import HeartOutlineIcon from '../../assets/icons/heart-outline.svg';
import HeartFillIcon from '../../assets/icons/heart.svg';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  Layout,
  measure,
  runOnJS,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import ChevronIcon from '../../assets/icons/chevron.svg';
import ZoomIcon from '../../assets/icons/plus.svg';

import colors from '../../utils/colors';
import {fp, hp, hpp, wp} from '../../utils/config';
import ProductDetails from '../../components/product/ProductDetails';
import {ProductScreenConstants} from '../../utils/config';
import {imageGridStyles} from '../../utils/defaultStyles';
import {FONT_TYPES} from '../../utils/style';

const CHEVRON_INIT_Y = hpp(12);
// const CHEVRON_CONTAIN_Y = hpp(84);

export default function ProductScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList>>();
  const [visibleModal, setModalVisible] = useState(false);
  const [hardwareBackPress, setHardwareBackPress] = useState(true);
  const aref = useAnimatedRef<any>();
  const imageRef = useAnimatedRef<any>();
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState<ProductType>();
  const childDimension = useSharedValue<Dimensions>({
    height: 0,
    width: 0,
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
  });
  const tappedDimensions = useSharedValue<Dimensions>({
    height: 0,
    width: 0,
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
  });
  const parentDimensions = useSharedValue<Dimensions>({
    height: 0,
    width: 0,
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
  });
  const imageContainerDimensions = useSharedValue<ImageDimensions>({
    x: 0,
    y: 0,
  });

  const sharedValue = useSharedValue(0);
  const position = useSharedValue(0);
  const imagePositionX = useSharedValue(0);
  const imagePositionY = useSharedValue(0);
  const animateTransition = useSharedValue(0);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      if (sharedValue.value === 0) {
        scale.value = savedScale.value * e.scale;
      }
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const goBack = useCallback(() => {
    navigation.goBack();
    setModalVisible(false);
  }, [navigation]);

  const toggleLike = useCallback(() => {
    setLiked(boolVal => !boolVal);
  }, []);

  const panGesture = Gesture.Pan()
    .onBegin(e => {
      if (sharedValue.value === -1) {
        sharedValue.value = withSpring(0);
      }
    })
    .onUpdate(e => {
      if (
        sharedValue.value === 0 &&
        e.translationY < 0 &&
        e.translationY > -ProductScreenConstants.SWIPE_HEIGHT
      ) {
        position.value = withSpring(e.translationY);
      } else if (
        sharedValue.value === 1 &&
        e.translationY > 0 &&
        e.translationY < ProductScreenConstants.SWIPE_HEIGHT
      ) {
        position.value = withSpring(
          -ProductScreenConstants.SWIPE_HEIGHT + e.translationY,
        );
      }
    })
    .onEnd(e => {
      if (
        sharedValue.value === 0 &&
        // e.translationY < 0 &&
        e.translationY < -ProductScreenConstants.SWIPE_HEIGHT / 2
      ) {
        position.value = withSpring(-ProductScreenConstants.SWIPE_HEIGHT);
        sharedValue.value = 1;
      } else if (
        sharedValue.value === 1 &&
        // e.translationY > 0 &&
        e.translationY > ProductScreenConstants.SWIPE_HEIGHT / 2
      ) {
        position.value = withSpring(0);
        sharedValue.value = 0;
      } else {
        if (sharedValue.value === 1) {
          position.value = withSpring(-ProductScreenConstants.SWIPE_HEIGHT);
        } else {
          position.value = withSpring(0);
        }
      }
    });

  const imagePanGesture = Gesture.Pan()
    .onUpdate(e => {
      if (sharedValue.value === -1) {
        imagePositionX.value = e.translationX;
        imagePositionY.value = e.translationY;
      }
    })
    .onEnd(e => {
      if (sharedValue.value === -1) {
        imagePositionX.value = withSpring(0);
        imagePositionY.value = withSpring(0);
      }
    });

  const animateContainerView = useAnimatedStyle(() => {
    const height = interpolate(
      position.value,
      [0, -ProductScreenConstants.SWIPE_HEIGHT],
      [
        ProductScreenConstants.CONTAINER_VIEW_INIT_HEIGHT,
        ProductScreenConstants.CONTAINER_VIEW_FINAL_HEIGHT,
      ],
    );
    return {
      height,
    };
  }, []);

  const animateImageView = useAnimatedStyle(() => {
    const height = interpolate(
      position.value,
      [0, -ProductScreenConstants.SWIPE_HEIGHT],
      [
        ProductScreenConstants.SWIPE_HEIGHT,
        ProductScreenConstants.IMAGE_FINAL_HEIGHT,
      ],
    );
    return {
      height,
    };
  }, []);
  const animateScaleImagePanGesture = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: imagePositionX.value},
        {translateY: imagePositionY.value},
      ],
    };
  }, []);

  const tappedStyles = useAnimatedStyle(() => {
    const y = interpolate(
      animateTransition.value,
      [0, 1],
      [
        parentDimensions.value.pageY + parentDimensions.value.height,
        tappedDimensions.value.height,
      ],
    );
    const x = interpolate(
      animateTransition.value,
      [0, 1],
      [ProductScreenConstants.DEVICE_FUll_WIDTH, tappedDimensions.value.width],
    );

    const top = interpolate(
      animateTransition.value,
      [0, 1],
      [0, tappedDimensions.value.pageY],
    );

    const left = interpolate(
      animateTransition.value,
      [0, 1],
      [0, tappedDimensions.value.pageX],
    );

    const border_radius = interpolate(
      animateTransition.value,
      [0, 1],
      [
        ProductScreenConstants.BORDER_RADIUS_FINAL,
        ProductScreenConstants.BORDER_RADIUS_INIT,
      ],
    );

    const backgroundColor = interpolateColor(
      animateTransition.value,
      [0, 1],
      [colors.bg, colors.cardBg],
    );

    return {
      height: y,
      width: x,
      left,
      top,
      // paddingTop,
      borderRadius: border_radius,
      backgroundColor,
    };
  }, []);

  const tappedImageStyles = useAnimatedStyle(() => {
    const y = interpolate(
      animateTransition.value,
      [0, 1],
      [childDimension.value.height, tappedDimensions.value.height],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );
    const x = interpolate(
      animateTransition.value,
      [0, 1],
      [childDimension.value.width, tappedDimensions.value.width],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );

    const top = interpolate(
      animateTransition.value,
      [0, 1],
      [
        ProductScreenConstants.PADDING_TOP + parentDimensions.value.pageY,
        tappedDimensions.value.pageY,
      ],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );
    const left = interpolate(
      animateTransition.value,
      [0, 1],
      [0, tappedDimensions.value.pageX],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );

    const translateX = interpolate(
      animateTransition.value,
      [0, 1],
      [0, imageContainerDimensions.value.x],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );
    const translateY = interpolate(
      animateTransition.value,
      [0, 1],
      [0, imageContainerDimensions.value.y],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );

    return {
      height: y,
      width: x,
      top,
      left,
      transform: [{translateX}, {translateY}],
    };
  });

  const scaleImageStyles = useAnimatedStyle(() => {
    const height = interpolate(
      sharedValue.value,
      [0, -1],
      [
        ProductScreenConstants.SWIPE_HEIGHT,
        ProductScreenConstants.IMAGE_SCALE_HEIGHT,
      ],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        // extrapolateRight: Extrapolate.CLAMP,
      },
    );

    return {
      height,
    };
  });

  const chevronAnimation = useAnimatedStyle(() => {
    const degree = interpolate(sharedValue.value, [0, 1], [-180, 0], {
      extrapolateLeft: Extrapolate.CLAMP,
      extrapolateRight: Extrapolate.CLAMP,
    });

    const translateY = interpolate(
      sharedValue.value,
      [0, 1],
      [0, CHEVRON_INIT_Y],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      },
    );

    return {
      transform: [{rotateZ: withSpring(`${degree}deg`)}, {translateY}],
    };
  });

  const scaleIconAnimation = useAnimatedStyle(() => {
    const degree = interpolate(sharedValue.value, [0, -1], [0, 45]);

    return {
      transform: [{rotateZ: withSpring(`${degree}deg`)}],
    };
  });

  const getDimensions = () => {
    'worklet';
    const dimensions = measure(aref);
    const imageMeasure = measure(imageRef);
    if (dimensions) {
      parentDimensions.value = dimensions;
      // runOnJS(setParamDimension)(dimensions);
      // runOnJS(toggleModal)();
      runOnJS(setModalVisible)(true);
    }
    if (imageMeasure) {
      childDimension.value = imageMeasure;
    }
  };

  const onTap = useCallback(() => {
    setHardwareBackPress(false);
    runOnUI(getDimensions)();
  }, []);

  const onScalePress = useCallback(() => {
    if (sharedValue.value === -1) {
      sharedValue.value = withSpring(0);
    } else {
      sharedValue.value = withSpring(-1);
    }
  }, []);

  useEffect(() => {
    if (route.params && route.params.item) {
      setProduct(route.params.item);
    }
    if (route.params && route.params.dimensions) {
      tappedDimensions.value = route.params.dimensions;
    }
    if (route.params && route.params.imageDimensions) {
      imageContainerDimensions.value = route.params.imageDimensions;
    }
  }, [route.params]);

  useEffect(() => {
    if (visibleModal) {
      animateTransition.value = withTiming(1, {duration: 20});
      setTimeout(goBack, 200);
    }
    return () => {
      animateTransition.value = 0;
    };
  }, [visibleModal]);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!hardwareBackPress) {
          return null;
        }
        e.preventDefault();
        onTap();
      }),
    [hardwareBackPress, navigation],
  );

  const composed = Gesture.Race(imagePanGesture, pinchGesture);

  return (
    <Container backgroundColor={colors.bg}>
      <StatusBar animated barStyle="dark-content" hidden={false} />
      <GestureHandlerRootView>
        <View style={styles.parentBg}>
          <Animated.View
            ref={aref}
            style={[styles.container, animateContainerView]}>
            <View style={styles.headerContainer}>
              <Pressable onPress={onTap} style={styles.iconContainer}>
                <BackIcon />
              </Pressable>
              <Text
                style={{
                  fontSize: fp(18),
                  fontFamily: FONT_TYPES.W_500,
                  color: colors.primary,
                  letterSpacing: 1,
                }}>
                Lamps
              </Text>
              <Pressable onPress={toggleLike} style={styles.iconContainer}>
                {liked ? <HeartFillIcon /> : <HeartOutlineIcon />}
              </Pressable>
            </View>
            {product && (
              <>
                <GestureDetector gesture={composed}>
                  <>
                    <Animated.Image
                      ref={imageRef}
                      source={product.image}
                      style={[
                        animateScaleImagePanGesture,
                        animateImageView,
                        styles.imageDimension,
                        scaleStyle,
                        scaleImageStyles,
                      ]}
                      resizeMode="contain"
                    />
                  </>
                </GestureDetector>
                <Pressable
                  onPress={onScalePress}
                  style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    width: hpp(50),
                    height: hpp(50),
                    alignSelf: 'center',
                    top: hp(25),
                    zIndex: 10,
                    borderRadius: hpp(5),
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                    right: wp(30),
                  }}>
                  <BlurView
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                    }}
                    blurType="light"
                    blurAmount={7}
                    reducedTransparencyFallbackColor="white"
                  />
                  <Animated.View style={scaleIconAnimation}>
                    <ZoomIcon style={{transform: [{translateY: hpp(15)}]}} />
                  </Animated.View>
                </Pressable>
              </>
            )}
            <ProductDetails position={position} />
          </Animated.View>
          <Animated.View>
            <GestureDetector gesture={panGesture}>
              <Animated.View style={[styles.purchaseContainer]}>
                <Animated.View style={[styles.chevronContainer]}>
                  <Animated.View style={chevronAnimation}>
                    <ChevronIcon />
                  </Animated.View>
                </Animated.View>
              </Animated.View>
              {/* {other compos} */}
            </GestureDetector>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
      <Modal transparent visible={visibleModal} animationType="fade">
        <Animated.View layout={Layout} style={[styles.modalContainer]}>
          <Animated.View style={[styles.modalSubcontainer, tappedStyles]} />
          {product && (
            <Animated.Image
              layout={Layout}
              source={product.image}
              style={[tappedImageStyles]}
              resizeMode="contain"
            />
          )}
        </Animated.View>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    borderBottomRightRadius: wp(7),
    borderBottomLeftRadius: wp(7),
    overflow: 'hidden',
    transform: [{perspective: 300}],
    shadowColor: colors.bg,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  parentBg: {
    backgroundColor: colors.primary,
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
    paddingHorizontal: 20,
  },
  purchaseContainer: {
    height: ProductScreenConstants.SWIPE_HEIGHT + hp(20),
  },
  iconContainer: {
    padding: hp(2),
  },
  // likeIconContainer: {
  //   padding: hp(2),
  // },
  modalContainer: {
    backgroundColor: colors.bg,
    flex: 1,
  },
  modalSubcontainer: {
    backgroundColor: colors.bg,
    position: 'absolute',
    borderRadius: wp(5),
    ...imageGridStyles.cardShadow,
  },
  chevronContainer: {
    width: hpp(54),
    height: hpp(54),
    alignSelf: 'center',
    backgroundColor: colors.bg,
    transform: [{translateY: -hpp(30)}],
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hpp(27),
    shadowColor: colors.bg,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
});
