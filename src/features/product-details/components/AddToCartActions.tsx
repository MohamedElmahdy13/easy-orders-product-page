import { Button } from '@/shared/ui/Button';

type AddToCartActionsProps = {
  disabled: boolean;
  onAddToCart: () => void;
  onCheckout: () => void;
};

export function AddToCartActions({ disabled, onAddToCart, onCheckout }: AddToCartActionsProps) {
  return (
    <div className="flex flex-col items-start gap-[18px] sm:flex-row sm:flex-wrap sm:gap-6">
      <Button onClick={onAddToCart} disabled={disabled}>
        Add To Cart
      </Button>
      <Button variant="outline" onClick={onCheckout} disabled={disabled}>
        Checkout Now
      </Button>
    </div>
  );
}
