export const safetyBulletpointList: BulletPointList = {
  title: 'Your Safety Is A Priority', list: [{ value: 'Choose a public place to meet.' }, { value: 'Provide your own transporation.' }, { value: 'Provide location to family or friends.' }]
}
export const mockDecriptions = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus error iure eligendi voluptates illo modi asperiores dolore dicta aspernatur quidem, ad';
export const categoryAll: Category = { id: 0, name: 'All', isDefault: true, bulletPointList: safetyBulletpointList };

export const categroryListMock: Category[] = [
  categoryAll,
  { id: 2, name: 'Beer', description: mockDecriptions, bulletPointList: safetyBulletpointList },
  {
    id: 3, name: 'Winery',
    description: mockDecriptions,
    bulletPointList: {
      title: 'What Experience Can We Have?',
      list: [
        { value: "We can sample a flight of wine" },
        { value: "We can sample a flight of wine" },
        { value: "We can sample a flight of wine" }]
    }

  },
  { id: 4, name: 'Museum', description: mockDecriptions, bulletPointList: safetyBulletpointList },
  { id: 5, name: 'Restaraunt', description: mockDecriptions, bulletPointList: safetyBulletpointList },
  { id: 6, name: 'Arcade', description: mockDecriptions, imageUrl: '/images/beercade-1.png', bulletPointList: safetyBulletpointList },
  { id: 7, name: 'Coffee', description: mockDecriptions, bulletPointList: safetyBulletpointList },
  { id: 8, name: 'Tacos', description: mockDecriptions, bulletPointList: safetyBulletpointList }
];

export class Category {
  id!: number;
  isDefault?: boolean = false;
  name!: string;
  count?: number = 0;
  imageUrl?: string;
  businessListUrl?: string;
  bulletPointList!: BulletPointList;
  description?: string;
}

export class BulletPointList {
  title!: string;
  list: Bulletpoint[] = []
}
export class Bulletpoint {
  value!: string;
  string?: string;
}