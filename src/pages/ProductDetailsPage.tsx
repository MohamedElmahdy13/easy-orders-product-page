import { ProductDetails, useProduct } from '@/features/product-details';
import { Breadcrumb } from '@/shared/ui/Breadcrumb';

const PRODUCT_SLUG = 'Sneakers12';

export function ProductDetailsPage() {
  // Same query as ProductDetails, so React Query does not fetch twice
  const { data: product } = useProduct(PRODUCT_SLUG);

  const breadcrumbItems = [
    { label: 'Homepage', href: '/' },
    ...(product?.categories[0] ? [{ label: product.categories[0].name }] : []),
    { label: product?.name ?? 'Loading...' },
  ];

  return (
    <div className="container-page mt-6 pb-16 lg:mt-7.75">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6 lg:mt-7.75">
        <ProductDetails slug={PRODUCT_SLUG} />
      </div>
    </div>
  );
}
