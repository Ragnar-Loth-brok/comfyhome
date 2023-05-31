type SharedElementRouteProps = {
  params: {
    id: string;
  };
};

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Product: undefined;
};

type ProuctType = {
  id: number;
  name: string;
  image: any;
  desc?: string;
  category?: string;
};

type Categories = {
  mixed: ProuctType[];
  lamps: ProuctType[];
  chairs: ProuctType[];
};

export type {
  SharedElementRouteProps,
  RootStackParamList,
  Categories,
  ProuctType,
};
