
export enum CollectionCategory {
  BEARBRICK = 'Bearbrick',
  COINS = 'Coins',
  BANKNOTES = 'Banknotes',
  PLUSHIES = 'Plushies',
  OTHERS = 'Others',
}

export interface CollectionItem {
  id: string;
  name: string;
  owned: boolean;
  rarity: string;
  imageUrl?: string;
}

export interface Collection {
  id:string;
  name: string;
  description: string;
  category: CollectionCategory;
  items: CollectionItem[];
}