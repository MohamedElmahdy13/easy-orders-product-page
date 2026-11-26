import { Breadcrumb } from '@/shared/ui/Breadcrumb';

// The last item will come from the product API in the product-details feature
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
    </div>
  );
}
