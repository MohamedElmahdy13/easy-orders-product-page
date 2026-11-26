// Only the fields of the API response that the page uses

export type VariationProp = {
  id: string;
  name: string; // "brown", "38"
  value?: string; // image url for color props
};

export type Variation = {
  id: string;
  name: string; // "color" | "size"
  type: 'image' | 'button';
  props: VariationProp[];
};

export type VariantProp = {
  variation: string; // "color"
  variation_prop: string; // "brown"
};

export type Variant = {
  id: string;
  price: number;
  sale_price: number; // 0 means no sale price on this variant
  quantity: number;
  variation_props: VariantProp[];
};

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string; // HTML
  price: number;
  sale_price: number;
  thumb: string;
  images: string[];
  quantity: number;
  track_stock: boolean;
  variations: Variation[];
  variants: Variant[];
  categories: Category[];
};
