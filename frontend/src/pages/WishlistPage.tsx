import { useQuery } from '@tanstack/react-query';
import { fetchWishlist, type WishlistItem } from '../api/wishlist';
import { WishlistTable } from '@/components/WishlistTable';

export function WishlistPage() {
  const { data, isLoading, isError } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load wishlist.</p>;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">My Wishlist</h1>
      <WishlistTable data={data ?? []} />
    </main>
  );
}
