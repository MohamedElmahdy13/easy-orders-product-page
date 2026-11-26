import { Button } from '@/shared/ui/Button';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useProduct } from '../hooks/useProduct';

// Temporary version: shows loading and error states and the raw product name/price.
// The gallery and product info come in the next steps.
export function ProductDetails({ slug }: { slug: string }) {
  const { data: product, isPending, isError, refetch } = useProduct(slug);

  if (isPending) {
    return (
      <div className="grid gap-8 lg:grid-cols-2">
        <Skeleton className="aspect-square w-full" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="flex flex-col items-center gap-4 py-16 text-center">
        <p className="text-label">We could not load this product.</p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-title font-semibold">{product.name}</h1>
      <p className="text-price">${product.sale_price || product.price}</p>
    </div>
  );
}
