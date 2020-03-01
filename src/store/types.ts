export type GcoProductType = "stickers";

export type GcoDesign = {
  id: string;
  name: string;
  variations: string[];
  tags: string[];
};

export type GcoProduct = {
  id: string;
  name: string;
  price: number;
  type: GcoProductType;
  description: string;
};

export type GcoProducts = GcoProduct[];

export type GcoDesigns = { [key in GcoProductType]: GcoDesign[] };

export type GcoDatabase = {
  products: GcoProducts;
  designs: GcoDesigns;
  loaded: boolean;
};
