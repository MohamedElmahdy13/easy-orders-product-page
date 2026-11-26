import { useQuery } from '@tanstack/react-query';
import { getProductBySlug } from '../api/product.api';

const FIVE_MINUTES = 5 * 60 * 1000;

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: ({ signal }) => getProductBySlug(slug, signal),
    staleTime: FIVE_MINUTES,
  });
}
