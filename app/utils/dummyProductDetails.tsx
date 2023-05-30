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

export const data: Categories = {
  mixed: [
    {
      id: 1,
      name: 'Chair',
      image: require('../assets/images/mixed/chair4.png'),
    },
    {
      id: 2,
      name: 'Cabinet',
      image: require('../assets/images/mixed/cabinet.png'),
    },
    {
      id: 3,
      name: 'Table',
      image: require('../assets/images/mixed/table.png'),
    },
    {
      id: 4,
      name: 'Table set',
      image: require('../assets/images/mixed/tableset.png'),
    },
    {
      id: 5,
      name: 'Table',
      image: require('../assets/images/mixed/table2.png'),
    },
    {
      id: 6,
      name: 'Bedside',
      image: require('../assets/images/mixed/bedside.png'),
    },
    {
      id: 7,
      name: 'Lamp',
      image: require('../assets/images/mixed/lamp.png'),
    },
    {
      id: 8,
      name: 'Lamp',
      image: require('../assets/images/mixed/lamp.png'),
    },
    {
      id: 9,
      name: 'Bedside',
      image: require('../assets/images/mixed/bedside.png'),
    },
    {
      id: 10,
      name: 'Lamp',
      image: require('../assets/images/mixed/lamp.png'),
    },
    {
      id: 11,
      name: 'Lamp',
      image: require('../assets/images/mixed/lamp.png'),
    },
    {
      id: 12,
      name: 'Lamp',
      image: require('../assets/images/mixed/lamp.png'),
    },
  ],
  lamps: [
    {
      id: 1,
      name: 'Chair',
      image: require('../assets/images/mixed/chair4.png'),
    },
    {
      id: 2,
      name: 'Cabinet',
      image: require('../assets/images/mixed/cabinet.png'),
    },
    {
      id: 3,
      name: 'Table',
      image: require('../assets/images/mixed/table.png'),
    },
    {
      id: 4,
      name: 'Table set',
      image: require('../assets/images/mixed/tableset.png'),
    },
  ],
  chairs: [
    {
      id: 1,
      name: 'Chair',
      image: require('../assets/images/mixed/chair4.png'),
    },
    {
      id: 2,
      name: 'Cabinet',
      image: require('../assets/images/mixed/cabinet.png'),
    },
    {
      id: 3,
      name: 'Table',
      image: require('../assets/images/mixed/table.png'),
    },
    {
      id: 4,
      name: 'Table set',
      image: require('../assets/images/mixed/tableset.png'),
    },
  ],
};
