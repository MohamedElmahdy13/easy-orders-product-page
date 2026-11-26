import { ProductDetails, useProduct } from '@/features/product-details';
import { Breadcrumb } from '@/shared/ui/Breadcrumb';
import { Divider } from '@/shared/ui/Divider';

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
    <>
      <section className="pb-16">
        <div className="container-page flex flex-col gap-6 lg:gap-7.75">
          <Divider />
          <Breadcrumb items={breadcrumbItems} />
          <ProductDetails slug={PRODUCT_SLUG} />
        </div>
      </section>
    </>
  );
}
