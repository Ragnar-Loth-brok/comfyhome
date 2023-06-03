import {Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('window').height || 0;
const deviceWidth = Dimensions.get('window').width || 0;

export const defaultDeviceSize = {
  height: 812,
  width: 375,
};

export const hp = (value: number) => {
  return (deviceHeight * value) / 100;
};

export const wp = (value: number) => {
  return (deviceWidth * value) / 100;
};

export const ICON_SF = hp(100) / defaultDeviceSize.height;
export const Width_SF = wp(100) / defaultDeviceSize.width;

export const fp = (val: number) => {
  return val * ICON_SF;
};

export const hpp = (val: number) => {
  return val * ICON_SF;
};

export const wpp = (val: number) => {
  return val * Width_SF;
};

export const splitArray = (list: any[], size: number) => {
  let arr = [];
  const length = list.length;
  const multiples = Math.trunc(list.length / size);
  const remainder = list.length % size;

  for (let i = 0; i < multiples; i++) {
    arr.push(list.slice(i * size, (i + 1) * size));
  }

  if (remainder > 0) {
    arr.push(list.slice(length - remainder, length));
  }

  return arr;
};

const SWIPE_HEIGHT = hp(50);
const CONTAINER_VIEW_INIT_HEIGHT = hp(85);
const CONTAINER_VIEW_FINAL_HEIGHT = hp(35);
const IMAGE_FINAL_HEIGHT = hp(30);
const DEVICE_FUll_WIDTH = wp(100);

export const ProductScreenConstants = {
  SWIPE_HEIGHT,
  CONTAINER_VIEW_FINAL_HEIGHT,
  CONTAINER_VIEW_INIT_HEIGHT,
  IMAGE_FINAL_HEIGHT,
  DEVICE_FUll_WIDTH,
};
