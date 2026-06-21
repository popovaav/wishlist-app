import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWishlist, type WishlistItem } from '../api/wishlist';
import { WishlistTable } from '@/components/WishlistTable';
import { CreateWishlistDialog } from '@/components/CreateWishlistDialog';
import { Button } from '@/components/ui/button';

export function WishlistPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<WishlistItem[]>({
    queryKey: ['wishlist'],
    queryFn: fetchWishlist,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load wishlist.</p>;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <Button onClick={() => setDialogOpen(true)}>Add Item</Button>
      </div>

      <WishlistTable data={data ?? []} />

      <CreateWishlistDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </main>
  );
}
