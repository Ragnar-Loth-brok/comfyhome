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
import colors from '../../utils/colors';
import {hp, ProductScreenConstants, wp, wpp} from '../../utils/config';
import {imageGridStyles} from '../../utils/defaultStyles';
import {
  Dimensions,
  ImageDimensions,
  ProductType,
} from '../../utils/globalTypes';

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
  onPress: (
    item: ProductType,
    dimensions: Dimensions,
    imageDimensions: ImageDimensions,
  ) => void;
  statusBarHeight: SharedValue<number>;
};

const SLIDEX = 30;
const SLIDEY = 30;
const SLIDEY_B = 15;

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
  const [paramImageDimension, setParamImageDimension] =
    useState<ImageDimensions>({x: 0, y: 0});
  const [navigateUser, setNavigateUser] = useState(false);
  const [visibleModal, setModalVisible] = useState<boolean>(false);
  const [tappedItem, setTappedItem] = useState<ProductType | null>();
  const [paramDimension, setParamDimension] = useState<Dimensions>({
    height: 0,
    pageX: 0,
    pageY: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  const tappedId = useSharedValue(0);
  const animateTransition = useSharedValue(0);
  // const image
  const tappedDimensions = useSharedValue<Dimensions>({
    height: 0,
    width: 0,
    pageX: 0,
    pageY: 0,
    x: 0,
    y: 0,
  });
  const aref_1 = useAnimatedRef<any>();
  const aref_2 = useAnimatedRef<any>();
  const aref_3 = useAnimatedRef<any>();
  const aref_4 = useAnimatedRef<any>();

  const aref_image_1 = useAnimatedRef<any>();
  const aref_image_2 = useAnimatedRef<any>();
  const aref_image_3 = useAnimatedRef<any>();
  const aref_image_4 = useAnimatedRef<any>();

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

  const toggleModal = useCallback(() => {
    animateTransition.value = withDelay(10, withTiming(1, {duration: 150}));
    setModalVisible(boolVal => !boolVal);
    setTimeout(() => {
      setNavigateUser(true);
    }, 350);
  }, []);

  const getDimensions = () => {
    'worklet';
    let dimensions;
    let imagePageValues;
    if (tappedId.value === 1) {
      dimensions = measure(aref_1);
      imagePageValues = measure(aref_image_1);
    } else if (tappedId.value === 2) {
      dimensions = measure(aref_2);
      imagePageValues = measure(aref_image_2);
    } else if (tappedId.value === 3) {
      dimensions = measure(aref_3);
      imagePageValues = measure(aref_image_3);
    } else if (tappedId.value === 4) {
      dimensions = measure(aref_4);
      imagePageValues = measure(aref_image_4);
    }

    if (dimensions) {
      tappedDimensions.value = dimensions;
      runOnJS(setParamDimension)(dimensions);
      runOnJS(toggleModal)();
    }
    if (imagePageValues) {
      runOnJS(setParamImageDimension)({
        x: imagePageValues.x,
        y: imagePageValues.y,
      });
    }
  };

  const onTap = useCallback((item: ProductType, id: 1 | 2 | 3 | 4) => {
    tappedId.value = id;
    setTappedItem(item);
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

    const border_radius_bottom = interpolate(
      animateTransition.value,
      [0, 1],
      [
        ProductScreenConstants.BORDER_RADIUS_INIT,
        ProductScreenConstants.BORDER_RADIUS_FINAL,
      ],
    );
    const border_radius_top = interpolate(
      animateTransition.value,
      [0, 1],
      [ProductScreenConstants.BORDER_RADIUS_INIT, 0],
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
      borderTopRightRadius: border_radius_top,
      borderTopLeftRadius: border_radius_top,
      borderBottomLeftRadius: border_radius_bottom,
      borderBottomRightRadius: border_radius_bottom,
      backgroundColor,
    };
  }, []);

  const tappedImageStyles = useAnimatedStyle(() => {
    const y = interpolate(
      animateTransition.value,
      [0, 1],
      [tappedDimensions.value.height, ProductScreenConstants.SWIPE_HEIGHT],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );
    const x = interpolate(
      animateTransition.value,
      [0, 1],
      [tappedDimensions.value.width, ProductScreenConstants.DEVICE_FUll_WIDTH],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );

    const top = interpolate(
      animateTransition.value,
      [0, 1],
      [
        tappedDimensions.value.pageY,
        ProductScreenConstants.PADDING_TOP + statusBarHeight.value,
      ],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );
    const left = interpolate(
      animateTransition.value,
      [0, 1],
      [tappedDimensions.value.pageX, 0],
      {extrapolateLeft: Extrapolate.CLAMP, extrapolateRight: Extrapolate.CLAMP},
    );

    return {
      height: y,
      width: x,
      top,
      left,
    };
  });

  useEffect(() => {
    if (tappedItem) {
      runOnUI(getDimensions)();
    }
  }, [tappedItem]);

  useEffect(() => {
    if (navigateUser && tappedItem) {
      onPress(tappedItem, paramDimension, paramImageDimension);
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
          <Animated.View ref={aref_1}>
            <Pressable
              style={[
                styles.imageContainer,
                imageGridStyles.imageTypeADimension,
              ]}
              onPress={() => onTap(products[0], 1)}>
              <Animated.View ref={aref_image_1} style={imageBAnimate}>
                <Image
                  source={products[0].image}
                  style={[imageGridStyles.imageTypeADimension]}
                  resizeMode="contain"
                />
              </Animated.View>
            </Pressable>
          </Animated.View>
          <Text style={imageGridStyles.title}>{products[0].name}</Text>
        </Animated.View>
      )}

      {products[1] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(500).springify()}
          style={styles.typeBContainer}>
          <Animated.View ref={aref_2}>
            <Pressable
              onPress={() => onTap(products[1], 2)}
              style={[
                styles.imageContainer,
                imageGridStyles.imageTypeBDimension,
              ]}>
              <Animated.View ref={aref_image_2} style={imageAAnimate}>
                <Image
                  source={products[1].image}
                  style={imageGridStyles.imageTypeBDimension}
                  resizeMode="contain"
                />
              </Animated.View>
            </Pressable>
          </Animated.View>
          <Text style={imageGridStyles.title}>{products[1].name}</Text>
        </Animated.View>
      )}
      {products[2] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(700).springify()}
          style={styles.typeCContainer}>
          <Animated.View ref={aref_3}>
            <Pressable
              onPress={() => onTap(products[2], 3)}
              style={[
                styles.imageContainer,
                imageGridStyles.imageTypeCDimension,
              ]}>
              <Animated.View ref={aref_image_3} style={imageAAnimate}>
                <Image
                  source={products[2].image}
                  style={imageGridStyles.imageTypeCDimension}
                  resizeMode="contain"
                />
              </Animated.View>
            </Pressable>
          </Animated.View>
          <Text style={imageGridStyles.title}>{products[2].name}</Text>
        </Animated.View>
      )}
      {products[3] && (
        <Animated.View
          layout={Layout}
          entering={ZoomIn.delay(300).springify()}
          style={styles.typeDContainer}>
          <Animated.View ref={aref_4}>
            <Pressable
              onPress={() => onTap(products[3], 4)}
              style={[
                styles.imageContainer,
                imageGridStyles.imageTypeDDimension,
              ]}>
              <Animated.View ref={aref_image_4} style={imageBAnimate}>
                <Image
                  source={products[3].image}
                  style={imageGridStyles.imageTypeDDimension}
                  resizeMode="contain"
                />
              </Animated.View>
            </Pressable>
          </Animated.View>
          <Text style={imageGridStyles.title}>{products[3].name}</Text>
        </Animated.View>
      )}
      <Modal transparent visible={visibleModal} animationType="fade">
        <Animated.View layout={Layout} style={[styles.modalContainer]}>
          <Animated.View style={[styles.modalSubcontainer, tappedStyles]} />
          {tappedItem && (
            <Animated.Image
              layout={Layout}
              source={tappedItem?.image}
              style={[tappedImageStyles]}
              resizeMode="contain"
            />
          )}
        </Animated.View>
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
  modalContainer: {
    backgroundColor: colors.appBgPrimary,
    flex: 1,
  },
  modalSubcontainer: {
    backgroundColor: colors.imageCardBg,
    position: 'absolute',
    borderRadius: ProductScreenConstants.BORDER_RADIUS_INIT,
  },
});
