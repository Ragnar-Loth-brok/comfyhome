type SharedElementRouteProps = {
  params: {
    id: string;
  };
};

type ProductType = {
  id: number;
  name: string;
  image: any;
  desc?: string;
  category?: string;
  uid: string;
};

type Categories = {
  mixed: ProductType[];
  lamps: ProductType[];
  chairs: ProductType[];
};

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Product: {
    item: ProductType;
  };
  AppFlow: undefined;
};

export type {
  SharedElementRouteProps,
  RootStackParamList,
  Categories,
  ProductType,
};
