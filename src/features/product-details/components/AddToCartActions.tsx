import { Button } from '@/shared/ui/Button';

type AddToCartActionsProps = {
  disabled: boolean;
  onAddToCart: () => void;
  onCheckout: () => void;
};

export function AddToCartActions({ disabled, onAddToCart, onCheckout }: AddToCartActionsProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
      <Button onClick={onAddToCart} disabled={disabled} className="sm:w-[296px]">
        Add To Cart
      </Button>
      <Button variant="outline" onClick={onCheckout} disabled={disabled} className="sm:w-[200px]">
        Checkout Now
      </Button>
    </div>
  );
}
