import { useQuery } from '@tanstack/react-query';
import { fetchWishlist, type WishlistItem } from '../api/wishlist';

export function WishlistPage() {
  const { data, isLoading, isError } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load wishlist.</p>;

  return (
    <main>
      <h1 className="text-3xl font-bold">My Wishlist</h1>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> — ${item.price} &nbsp;
            <span>[{item.priority}]</span> &nbsp;
            <span>{item.status}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
