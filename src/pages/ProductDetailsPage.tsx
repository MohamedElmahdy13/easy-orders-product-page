import { ProductDetails } from '@/features/product-details';
import { Breadcrumb } from '@/shared/ui/Breadcrumb';

const PRODUCT_SLUG = 'Sneakers12';

// The last item will come from the product name once the product info is built
const breadcrumbItems = [
  { label: 'Homepage', href: '/' },
  { label: 'Women' },
  { label: "Women's Shirts & Tops" },
  { label: 'Long Sleeve Overshirt, Khaki, 6' },
];

export function ProductDetailsPage() {
  return (
    <div className="container-page mt-6 pb-16 lg:mt-[31px]">
      <Breadcrumb items={breadcrumbItems} />

      <div className="mt-6 lg:mt-[31px]">
        <ProductDetails slug={PRODUCT_SLUG} />
      </div>
    </div>
  );
}
