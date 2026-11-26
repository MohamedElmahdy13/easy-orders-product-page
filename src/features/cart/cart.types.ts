export type CartItem = {
  id: string; // productId + variantId, so each variant is its own line
  productId: string;
  name: string;
  image: string;
  price: number; // unit price when it was added
  color?: string;
  size?: string;
  quantity: number;
  maxQuantity: number;
};
