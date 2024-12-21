import { Address } from "./business.service";

export class Business {
  id!: number;
  categoryId!: number;
  name!: string;
  
  address!: Address;
  imageUrl!: string;
  googleMapUrl!: string;
  facebookUrl!: string;
  url!: string;
  urlContact?: string;
  urlList!: Url[];  
  urlAppSendTo = 'aaa';
};
export class StateLocation {
  name!: string;
  abbreviation!: string;
  businessCount?: number = 0;
};

export class Url {
  description!: string;
  value!: string;
  icon!:string;
}

export const stateListMock: StateLocation[] = [
  { name: 'Nebraska', abbreviation: 'NE' },
  { name: 'Georgia', abbreviation: 'GA' }
];
