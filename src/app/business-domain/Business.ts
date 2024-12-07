import { Address } from "./business.service";

export class Business {
  id!: number;
  categoryId!: number;
  name!: string;
  url!: string;
  urlContact?: string;
  address!: Address;
  imageUrl!: string;
  googleMapUrl!: string;
  facebookUrl!: string;
  urlList!: Url[]
};
export class StateLocation {
  name!: string;
  abbreviation!: string;
  businessCount?: number = 0;
};

export class Url {
  description!: string;
  url!: string;
}

export const stateListMock: StateLocation[] = [
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Georgia', abbreviation: 'GA' }
];
