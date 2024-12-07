
export const mockDecriptions = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus error iure eligendi voluptates illo modi asperiores dolore dicta aspernatur quidem, ad';

export const categoryAll: Category = { id: 0, name: 'All' };

export const categroryListMock: Category[] = [
  categoryAll,
  { id: 2, name: 'Beer', description: mockDecriptions },
  { id: 3, name: 'Winery', description: mockDecriptions },
  { id: 4, name: 'Museum', description: mockDecriptions },
  { id: 5, name: 'Restaraunt', description: mockDecriptions },
  { id: 6, name: 'Arcade', description: mockDecriptions, imageUrl: '/images/beercade-1.png' },
  { id: 7, name: 'Coffee', description: mockDecriptions },
  { id: 8, name: 'Tacos', description: mockDecriptions }
];

export class Category {
  id!: number;
  name!: string;
  count?: number = 0;
  imageUrl?: string;
  businessListUrl?: string;
  description?: string;
}

