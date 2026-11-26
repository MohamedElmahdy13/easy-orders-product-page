import { Button } from '@/shared/ui/Button';

type AddToCartActionsProps = {
  disabled: boolean;
  onAddToCart: () => void;
  onCheckout: () => void;
  addDisabled: boolean; // for example when the cart already has the max quantity
  message: string;
};

export function AddToCartActions({ disabled, onAddToCart, onCheckout, addDisabled, message }: AddToCartActionsProps) {
  return (
    <div className="relative flex flex-col items-start gap-[18px] sm:flex-row sm:flex-wrap sm:gap-6">
      <Button onClick={onAddToCart} disabled={disabled || addDisabled}>
        Add To Cart
      </Button>
      <Button variant="outline" onClick={onCheckout} disabled={disabled}>
        Checkout Now
      </Button>

      {/* Sits under the buttons without pushing the page down */}
      <p role="status" className="absolute top-full mt-2 text-sm font-medium text-heading">
        {message}
      </p>
    </div>
  );
}
