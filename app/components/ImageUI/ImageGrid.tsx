/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Modal} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  Layout,
  measure,
  runOnJS,
  runOnUI,
  SharedValue,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  ZoomIn,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../utils/colors';
import {hp, ProductScreenConstants, wp, wpp} from '../../utils/config';
import {imageGridStyles} from '../../utils/defaultStyles';
import {ProductType} from '../../utils/globalTypes';

type Props = {
  idX: number;
  scrollX: SharedValue<number>;
  width: SharedValue<number>;
  idY: number;
  scrollY: SharedValue<number>;
  height: SharedValue<number>;
  totalItemX: number;
  totalItemY: number;
  products: ProductType[];
  onPress: (item: ProductType) => void;
  statusBarHeight: SharedValue<number>;
};

const SLIDEX = 30;
const SLIDEY = 30;
const SLIDEY_B = 15;

const BORDER_RADIUS = wp(5);
const PADDING_TOP = hp(5);

type Dimensions = {
  height: number;
  width: number;
  pageX: number;
  pageY: number;
  x: number;
  y: number;
};

export default function ImageGrid({
  idX,
  scrollX,
  width,
  height,
  idY,
  scrollY,
  totalItemX,
  totalItemY,
  products,
  onPress,
  statusBarHeight,
}: Props): JSX.Element {
  const tappedId = useSharedValue(0);
  const animateTransition = useSharedValue(0);
  const [navigateUser, setNavigateUser] = useState(false);
  const tappedDimensions = useSharedValue<Dimensions>({
    height: 0,
    width: 0,
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
  });
  const aref_1 = useAnimatedRef();
  const aref_2 = useAnimatedRef();
  const aref_3 = useAnimatedRef();
  const aref_4 = useAnimatedRef();

  const [visibleModal, setModalVisible] = useState<boolean>(false);
  const [tappedItem, setTappedItem] = useState<ProductType>();

  const imageAAnimate = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [0, width.value],
      [0 + idX * SLIDEX, -(totalItemX - idX - 1) * SLIDEX],
    );
    const translateY = interpolate(
      scrollY.value,
      [0, height.value],
      [0 + idY * SLIDEY, -(totalItemY - idY - 1) * SLIDEY],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      transform: [{translateX}, {translateY}],
    };
  }, []);
  const imageBAnimate = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollX.value,
      [0, width.value],
      [0 + idX * SLIDEX, -(totalItemX - idX - 1) * SLIDEX],
    );
    const translateY = interpolate(
      scrollY.value,
      [0, height.value],
      [0 + idY * SLIDEY_B, -(totalItemY - idY - 1) * SLIDEY_B],
      {
        extrapolateLeft: Extrapolate.CLAMP,
        extrapolateRight: Extrapolate.CLAMP,
      },
    );
    return {
      transform: [{translateX}, {translateY}],
    };
  }, []);

  const toggleModal = useCallback(async () => {
    await setModalVisible(boolVal => !boolVal);
    animateTransition.value = withDelay(300, withTiming(1, {duration: 500}));
    setTimeout(() => {
      setNavigateUser(true);
    }, 1000);
  }, []);

  const getDimensions = () => {
    'worklet';
    let dimensions;
    if (tappedId.value === 1) {
      dimensions = measure(aref_1);
    } else if (tappedId.value === 2) {
      dimensions = measure(aref_2);
    } else if (tappedId.value === 3) {
      dimensions = measure(aref_3);
    } else if (tappedId.value === 4) {
      dimensions = measure(aref_4);
    }

    if (dimensions) {
      tappedDimensions.value = dimensions;
      runOnJS(toggleModal)();
    }
  };

  const onTap = useCallback(async (item: ProductType, id: 1 | 2 | 3 | 4) => {
    tappedId.value = id;
    await setTappedItem(item);
  }, []);

  const tappedStyles = useAnimatedStyle(() => {
    const y = interpolate(
      animateTransition.value,
      [0, 1],
      [
        tappedDimensions.value.height,
        ProductScreenConstants.CONTAINER_VIEW_INIT_HEIGHT +
          statusBarHeight.value,
      ],
    );
    const x = interpolate(
      animateTransition.value,
      [0, 1],
      [tappedDimensions.value.width, ProductScreenConstants.DEVICE_FUll_WIDTH],
    );

    const top = interpolate(
      animateTransition.value,
      [0, 1],
      [tappedDimensions.value.pageY, 0],
    );

    const left = interpolate(
      animateTransition.value,
      [0, 1],
      [tappedDimensions.value.pageX, 0],
    );

    const paddingTop = interpolate(
      animateTransition.value,
      [0, 0.5],
      [0, PADDING_TOP + statusBarHeight.value],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );

    const border_radius = interpolate(
      animateTransition.value,
      [0, 1],
      [BORDER_RADIUS, BORDER_RADIUS + 20],
    );

    const backgroundColor = interpolateColor(
      animateTransition.value,
      [0, 1],
      [colors.imageCardBg, colors.secondaryBg],
    );

    return {
      height: y,
      width: x,
      left,
      top,
      paddingTop,
      borderRadius: border_radius,
      backgroundColor,
    };
  }, []);

  const tappedImageStyles = useAnimatedStyle(() => {
    const y = interpolate(
      animateTransition.value,
      [0, 1],
      [tappedDimensions.value.height, ProductScreenConstants.SWIPE_HEIGHT],
    );
    const x = interpolate(
      animateTransition.value,
      [0, 1],
      [tappedDimensions.value.width, ProductScreenConstants.DEVICE_FUll_WIDTH],
    );

    return {
      height: y,
      width: x,
    };
  });

  useEffect(() => {
    if (tappedItem) {
      runOnUI(getDimensions)();
    }
  }, [tappedItem]);

  useEffect(() => {
    if (navigateUser && tappedItem) {
      onPress(tappedItem);
      setModalVisible(false);
      setTappedItem(null);
      setNavigateUser(false);
      animateTransition.value = 0;
    }
  }, [navigateUser, onPress, tappedItem]);

  return (
    <View style={styles.container}>
      {products[0] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(200).springify()}
          style={styles.typeAContainer}>
          {/* <SharedElement id={`${products[0].uid}${idX}${idY}`}> */}
          <Animated.View ref={aref_1}>
            <Pressable
              style={[
                styles.imageContainer,
                imageGridStyles.imageTypeADimension,
              ]}
              onPress={() => onTap(products[0], 1)}>
              <Animated.View style={imageBAnimate}>
                <Image
                  source={products[0].image}
                  style={[imageGridStyles.imageTypeADimension]}
                  resizeMode="contain"
                />
              </Animated.View>
            </Pressable>
          </Animated.View>
          {/* </SharedElement> */}
          <Text style={imageGridStyles.title}>{products[0].name}</Text>
        </Animated.View>
      )}

      {products[1] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(500).springify()}
          style={styles.typeBContainer}>
          {/* <SharedElement id={`${products[1].uid}${idX}${idY}`}> */}
          <Animated.View ref={aref_2}>
            <Pressable
              onPress={() => onTap(products[1], 2)}
              style={[
                styles.imageContainer,
                imageGridStyles.imageTypeBDimension,
              ]}>
              <Animated.View style={imageAAnimate}>
                <Image
                  source={products[1].image}
                  style={imageGridStyles.imageTypeBDimension}
                  resizeMode="contain"
                />
              </Animated.View>
            </Pressable>
          </Animated.View>
          {/* </SharedElement> */}
          <Text style={imageGridStyles.title}>{products[1].name}</Text>
        </Animated.View>
      )}
      {products[2] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(700).springify()}
          style={styles.typeCContainer}>
          {/* <SharedElement id={`${products[2].uid}${idX}${idY}`}> */}
          <Animated.View ref={aref_3}>
            <Pressable
              onPress={() => onTap(products[2], 3)}
              style={[
                styles.imageContainer,
                imageGridStyles.imageTypeCDimension,
              ]}>
              <Animated.View style={imageAAnimate}>
                <Image
                  source={products[2].image}
                  style={imageGridStyles.imageTypeCDimension}
                  resizeMode="contain"
                />
              </Animated.View>
            </Pressable>
          </Animated.View>
          {/* </SharedElement> */}
          <Text style={imageGridStyles.title}>{products[2].name}</Text>
        </Animated.View>
      )}
      {products[3] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(300).springify()}
          style={styles.typeDContainer}>
          {/* <SharedElement id={`${products[3].uid}${idX}${idY}`}> */}
          <Animated.View ref={aref_4}>
            <Pressable
              onPress={() => onTap(products[3], 4)}
              style={[
                styles.imageContainer,
                imageGridStyles.imageTypeDDimension,
              ]}>
              <Animated.View style={imageBAnimate}>
                <Image
                  source={products[3].image}
                  style={imageGridStyles.imageTypeDDimension}
                  resizeMode="contain"
                />
              </Animated.View>
            </Pressable>
          </Animated.View>
          {/* </SharedElement> */}
          <Text style={imageGridStyles.title}>{products[3].name}</Text>
        </Animated.View>
      )}
      <Modal transparent visible={visibleModal} animationType="fade">
        <SafeAreaView>
          <Animated.View
            style={[
              {
                backgroundColor: colors.imageCardBg,
                // backgroundColor: 'red',
                position: 'absolute',
                borderRadius: wp(5),
              },
              tappedStyles,
            ]}>
            {tappedItem && (
              <Animated.Image
                layout={Layout}
                source={tappedItem?.image}
                style={[tappedImageStyles]}
                resizeMode="contain"
              />
            )}
          </Animated.View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(85),
    height: hp(41),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wpp(20),
  },
  imageContainer: {
    backgroundColor: colors.imageCardBg,
    borderRadius: wp(5),
    overflow: 'hidden',
  },

  typeAContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  typeBContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  typeCContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  typeDContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
