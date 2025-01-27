import { Address } from "../address/Adress";

export class Business {
  id!: number;
  categoryId!: number;
  name!: string;
  rank = 99;// 1 is the highest rank
  address!: Address;
  imageUrl!: string;
  // googleMapUrl!: string;
  facebookUrl!: string;
  url!: string;
  urlContact?: string;
  urlList!: Url[];
  urlInvite!: Url;
};
export class StateLocation {
  name!: string;
  abbreviation!: string;
  businessCount?: number = 0;
};

export class Url {
  description!: string;
  value!: string;
  icon!: string;
  hint!: string;
}

export const stateListMock: StateLocation[] = [
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Georgia', abbreviation: 'GA' }
];
