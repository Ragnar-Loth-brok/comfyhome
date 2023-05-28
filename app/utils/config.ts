import {Dimensions} from 'react-native';

const deviceHeight = Dimensions.get('screen').height || 0;
const deviceWidth = Dimensions.get('screen').width || 0;

export const defaultDeviceSize = {
  height: 844,
  width: 390,
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
