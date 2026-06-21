import { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnFiltersState,
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

interface WishlistTableProps {
  data: WishlistItem[];
}

export function WishlistTable({ data }: WishlistTableProps) {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<WishlistItem | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { mutate: deleteItem, isPending: isDeleting, variables: deletingId } = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  const columns = useWishlistColumns({
    onEdit: setEditingItem,
    onDelete: deleteItem,
    isDeleting,
    deletingId,
  });

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnFilters },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const getFilterValue = (columnId: string) =>
    (table.getColumn(columnId)?.getFilterValue() as string) ?? '';

  const titleFilter = getFilterValue('title');
  const statusFilter = getFilterValue('status');
  const priorityFilter = getFilterValue('priority');
  const isFiltered = titleFilter || statusFilter || priorityFilter;

  return (
    <>
      <WishlistTableToolbar
        titleFilter={titleFilter}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        isFiltered={!!isFiltered}
        onTitleChange={(v) => table.getColumn('title')?.setFilterValue(v)}
        onStatusChange={(v) => table.getColumn('status')?.setFilterValue(v)}
        onPriorityChange={(v) => table.getColumn('priority')?.setFilterValue(v)}
        onReset={() => table.resetColumnFilters()}
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
    </>
  );
}
