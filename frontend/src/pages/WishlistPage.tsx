import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWishlist, type PaginatedWishlist } from '../api/wishlist';
import { WishlistTable } from '@/components/WishlistTable';
import { CreateWishlistDialog } from '@/components/CreateWishlistDialog';
import { Button } from '@/components/ui/button';

const LIMIT = 10;

export function WishlistPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery<PaginatedWishlist>({
    queryKey: ['wishlist', page],
    queryFn: () => fetchWishlist({ page, limit: LIMIT }),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load wishlist.</p>;

  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <Button onClick={() => setDialogOpen(true)}>Add Item</Button>
      </div>

      <WishlistTable data={data?.items ?? []} />

      <div className="mt-4 flex items-center justify-center gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      <CreateWishlistDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </main>
  );
}
