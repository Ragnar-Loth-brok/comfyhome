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
