export const safetyBulletpointList_Mock: BulletPointList = {
  title: 'Your Safety Is A Priority', list: [{ value: 'Choose a public place to meet.' }, { value: 'Provide your own transporation.' }, { value: 'Provide location to family or friends.' }]
};
export const mockDecriptions = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus error iure eligendi ';

export class Category {
  id!: number;
  isDefault?: boolean = false;
  name!: string;
  count?: number = 0;
  imageUrl?: string;
  businessListUrl?: string;
  bulletPointList!: BulletPointList;
  description?: string;
  title?: string;
};

export const categoryMyFavorite: Category = { id: 0, name: 'My Favorite', title: 'Can We Meet To Talk?', imageUrl: '/images/winery-2.png', isDefault: true, bulletPointList: safetyBulletpointList_Mock };

export const categroryListMock: Category[] = [
  categoryMyFavorite,
  { id: 2, name: 'Beer', title: 'Can We Grab A Pint and Talk?', imageUrl: '/images/beer-1.png', description: mockDecriptions, bulletPointList: safetyBulletpointList_Mock },
  {
    id: 3, name: 'Winery',
    description: mockDecriptions,
    imageUrl: '/images/winery-1.png',
    title: 'Can we talk about your favorite wine?',
    bulletPointList: {
      title: 'What Experience Can We Have?',
      list: [
        { value: "We Can Sample A Flight Of Wine" },
        { value: "Sample an array of assortment cheese." },
        { value: "We can sample a flight of wine" }]
    }

  },
  { id: 4, name: 'Museum', title: "Can We Look At Art and Talk?", imageUrl: '/images/museum-1.png', description: mockDecriptions, bulletPointList: safetyBulletpointList_Mock },
  { id: 5, name: 'Restaraunt', title: "Can we get a bite and talk?", imageUrl: '/images/pizza-1.png', description: mockDecriptions, bulletPointList: safetyBulletpointList_Mock },
  {
    id: 6, name: 'Arcade', description: mockDecriptions, imageUrl: '/images/arcade-1.png', bulletPointList: {
      title: 'What Experience Can We Have?', list: [{ value: "Do You Enjoy Playing Video Games?" }]
    }
  },
  { id: 7, name: 'Coffee', title: "Can we Get A Mocha and talk?", imageUrl: '/images/coffee-2.png', description: mockDecriptions, bulletPointList: safetyBulletpointList_Mock },
  { id: 8, name: 'Tacos', title: "Can we get get some tacos and talk?", imageUrl: '/images/tacos-1.png', description: mockDecriptions, bulletPointList: safetyBulletpointList_Mock }
];

export class BulletPointList {
  title!: string;
  list: Bulletpoint[] = [];
}
export class Bulletpoint {
  value!: string;
  string?: string;
}