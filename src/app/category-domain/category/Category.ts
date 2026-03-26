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

export class BulletPointList {
  title!: string;
  list: Bulletpoint[] = [];
}
export class Bulletpoint {
  value!: string;
  string?: string;
}


export interface CategoryId {
  categoryId: number;
}