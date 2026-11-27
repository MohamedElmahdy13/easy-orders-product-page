import { getCategoryNames, ProductDetails, useProduct } from '@/features/product-details';
import { Breadcrumb } from '@/shared/ui/Breadcrumb';
import { Divider } from '@/shared/ui/Divider';

const PRODUCT_SLUG = 'Sneakers12';

export function ProductDetailsPage() {
  // Same query as ProductDetails, so React Query does not fetch twice
  const { data: product, isError } = useProduct(PRODUCT_SLUG);

  const breadcrumbItems = [
    { label: 'Homepage', href: '/' },
    ...(product ? getCategoryNames(product).map((name) => ({ label: name })) : []),
    { label: product?.name ?? (isError ? 'Product unavailable' : 'Loading...') },
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
