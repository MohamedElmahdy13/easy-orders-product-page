export type WishlistItem = {
  id: string; // productId + variantId, so each color and size is its own line
  productId: string;
  name: string;
  image: string;
  price: number; // unit price when it was saved
  color?: string;
  size?: string;
  maxQuantity: number; // stock when it was saved, used when the item moves to the cart
};
