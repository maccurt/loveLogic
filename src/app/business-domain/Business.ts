import { Address } from "./business.service";

export class Category {
  id!: number;
  name!: string;
  count?: number = 0;
  imageUrl?: string;
  businessListUrl?:string;
  description?: string;
};

export const mockDecriptions = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus error iure eligendi voluptates illo modi asperiores dolore dicta aspernatur quidem, ad';

export const categoryAll: Category = { id: 0, name: 'All' };
export const categroryListMock: Category[] = [
  categoryAll,
  { id: 2, name: 'Beer Brewery', description: mockDecriptions },
  { id: 3, name: 'Winery', description: mockDecriptions },
  { id: 4, name: 'Museum & Art', description: mockDecriptions },
  { id: 5, name: 'Restaraunt', description: mockDecriptions },
  { id: 6, name: 'Arcade Games', description: mockDecriptions, imageUrl:'/images/beercade-1.png' },
  { id: 7, name: 'Coffee Shop', description: mockDecriptions }
];

export class Business {
  id!:number;
  categoryId!: number;
  name!: string;
  url!: string;
  urlContact?: string;
  address!: Address;
  imageUrl!: string;
  googleMapUrl!: string;
  facebookUrl!: string;  
};

export class StateLocation {
  name!: string;
  abbreviation!: string;
  businessCount?:number = 0;
};

export const stateListMock: StateLocation[] = [
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Georgia', abbreviation: 'GA' }
];
