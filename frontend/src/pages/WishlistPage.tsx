import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { type SortingState } from '@tanstack/react-table';
import { fetchWishlist, type PaginatedWishlist } from '../api/wishlist';
import { WishlistTable } from '@/components/WishlistTable';
import { WishlistTableSkeleton } from '@/components/WishlistTableSkeleton';
import { CreateWishlistDialog } from '@/components/CreateWishlistDialog';
import { Button } from '@/components/ui/button';

const LIMIT = 10;

export function WishlistPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const sortBy = sorting[0]?.id;
  const sortOrder = sorting[0] ? (sorting[0].desc ? 'desc' : 'asc') as 'asc' | 'desc' : undefined;
  const isFiltered = !!search || !!status || !!priority;

  const { data, isLoading, isError } = useQuery<PaginatedWishlist>({
    queryKey: ['wishlist', { page, search, status, priority, sortBy, sortOrder }],
    queryFn: () => fetchWishlist({
      page,
      limit: LIMIT,
      search:   search   || undefined,
      status:   status   || undefined,
      priority: priority || undefined,
      sortBy,
      sortOrder,
    }),
    placeholderData: keepPreviousData,
  });

  if (isError) return <p>Failed to load wishlist.</p>;

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;

  function handleSearchChange(v: string | undefined) {
    setSearch(v ?? '');
    setPage(1);
  }
  function handleStatusChange(v: string | undefined) {
    setStatus(v ?? '');
    setPage(1);
  }
  function handlePriorityChange(v: string | undefined) {
    setPriority(v ?? '');
    setPage(1);
  }
  function handleSortingChange(next: SortingState) {
    setSorting(next);
    setPage(1);
  }
  function handleResetFilters() {
    setSearch('');
    setStatus('');
    setPriority('');
    setPage(1);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Wishlist</h1>
        <Button onClick={() => setDialogOpen(true)}>Add Item</Button>
      </div>

      {isLoading ? (
        <WishlistTableSkeleton />
      ) : (
        <>
          <WishlistTable
            data={data?.items ?? []}
            search={search}
            status={status}
            priority={priority}
            isFiltered={isFiltered}
            sorting={sorting}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
            onSortingChange={handleSortingChange}
            onResetFilters={handleResetFilters}
          />

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
        </>
      )}

      <CreateWishlistDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </main>
  );
}
