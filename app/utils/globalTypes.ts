type SharedElementRouteProps = {
  params: {
    id: string;
  };
};

type ProductType = {
  id: number;
  name: string;
  image: any;
  price?: string | number;
  category?: string;
  short_desc?: string;
  desc?: string;
  uid: string;
};

type Categories = {
  mixed: ProductType[];
  lamps: ProductType[];
  chairs: ProductType[];
};

type Dimensions = {
  height: number;
  width: number;
  pageX: number;
  pageY: number;
  x: number;
  y: number;
};

type ImageDimensions = {
  x: number;
  y: number;
};

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Product: {
    item: ProductType;
    dimensions: Dimensions;
    imageDimensions: ImageDimensions;
  };
  AppFlow: undefined;
};

export type {
  SharedElementRouteProps,
  RootStackParamList,
  Categories,
  ProductType,
  Dimensions,
  ImageDimensions,
};
