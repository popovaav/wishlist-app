import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type SortingState,
} from '@tanstack/react-table';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { WishlistTableToolbar } from './WishlistTableToolbar';
import { deleteWishlistItem, type WishlistItem } from '@/api/wishlist';
import { useWishlistColumns } from '@/hooks/useWishlistColumns';
import { EditWishlistDialog } from './EditWishlistDialog';
import { DeleteWishlistDialog } from './DeleteWishlistDialog';

interface WishlistTableProps {
  data: WishlistItem[];
  search: string;
  status: string;
  priority: string;
  isFiltered: boolean;
  sorting: SortingState;
  onSearchChange: (v: string | undefined) => void;
  onStatusChange: (v: string | undefined) => void;
  onPriorityChange: (v: string | undefined) => void;
  onSortingChange: (sorting: SortingState) => void;
  onResetFilters: () => void;
}

export function WishlistTable({
  data,
  search,
  status,
  priority,
  isFiltered,
  sorting,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortingChange,
  onResetFilters,
}: WishlistTableProps) {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<WishlistItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<WishlistItem | null>(null);

  const { mutate: deleteItem, isPending: isDeleting } = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      setDeletingItem(null);
    },
  });

  const columns = useWishlistColumns({
    onEdit: setEditingItem,
    onDeleteRequest: setDeletingItem,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: (updater) => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      onSortingChange(next);
    },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualFiltering: true,
  });

  return (
    <>
      <WishlistTableToolbar
        titleFilter={search}
        statusFilter={status}
        priorityFilter={priority}
        isFiltered={isFiltered}
        onTitleChange={onSearchChange}
        onStatusChange={onStatusChange}
        onPriorityChange={onPriorityChange}
        onReset={onResetFilters}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  {isFiltered ? 'No items match your filters.' : 'No items in your wishlist yet.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <EditWishlistDialog
        item={editingItem}
        onOpenChange={(open) => { if (!open) setEditingItem(null); }}
      />

      <DeleteWishlistDialog
        item={deletingItem}
        isPending={isDeleting}
        onConfirm={() => deletingItem && deleteItem(deletingItem.id)}
        onOpenChange={(open) => { if (!open) setDeletingItem(null); }}
      />
    </>
  );
}
