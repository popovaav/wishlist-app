import { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type Column,
  type ColumnDef,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal, RotateCcw } from 'lucide-react';
import { deleteWishlistItem, type WishlistItem } from '@/api/wishlist';
import { EditWishlistDialog } from './EditWishlistDialog';

const priorityStyles: Record<WishlistItem['priority'], string> = {
  High:   'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  Medium: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  Low:    'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
};

const statusStyles: Record<WishlistItem['status'], string> = {
  Want:      'border-transparent bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
  Purchased: 'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
};

const usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

interface WishlistTableProps {
  data: WishlistItem[];
}

function SortableHeader({ column, label }: { column: Column<WishlistItem>; label: string }) {
  const sorted = column.getIsSorted();
  const Icon = sorted === 'asc' ? ArrowUp : sorted === 'desc' ? ArrowDown : ArrowUpDown;
  return (
    <button
      className="flex cursor-pointer items-center gap-1.5 font-medium hover:text-foreground"
      onClick={(e) => column.getToggleSortingHandler()?.(e)}
    >
      {label}
      <Icon className={`size-3.5 ${sorted ? 'text-foreground' : 'text-muted-foreground'}`} />
    </button>
  );
}

const priorityOrder: Record<WishlistItem['priority'], number> = { High: 3, Medium: 2, Low: 1 };

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

  const columns = useMemo<ColumnDef<WishlistItem>[]>(
    () => [
      {
        accessorKey: 'title',
        header: ({ column }) => <SortableHeader column={column} label="Title" />,
      },
      {
        accessorKey: 'price',
        enableColumnFilter: false,
        sortingFn: (a, b) => Number(a.original.price) - Number(b.original.price),
        header: ({ column }) => <SortableHeader column={column} label="Price" />,
        cell: ({ getValue }) => usd.format(Number(getValue<string>())),
      },
      {
        accessorKey: 'priority',
        filterFn: 'equals',
        sortingFn: (a, b) => priorityOrder[a.original.priority] - priorityOrder[b.original.priority],
        header: ({ column }) => <SortableHeader column={column} label="Priority" />,
        cell: ({ getValue }) => {
          const value = getValue<WishlistItem['priority']>();
          return <Badge className={priorityStyles[value]}>{value}</Badge>;
        },
      },
      {
        accessorKey: 'status',
        filterFn: 'equals',
        header: ({ column }) => <SortableHeader column={column} label="Status" />,
        cell: ({ getValue }) => {
          const value = getValue<WishlistItem['status']>();
          return <Badge className={statusStyles[value]}>{value}</Badge>;
        },
      },
      {
        id: 'actions',
        enableSorting: false,
        enableColumnFilter: false,
        header: '',
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Row actions">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditingItem(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                disabled={isDeleting && deletingId === row.original.id}
                onClick={() => deleteItem(row.original.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [deleteItem, isDeleting, deletingId],
  );

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

  const titleFilter  = (table.getColumn('title')?.getFilterValue()    as string) ?? '';
  const statusFilter = (table.getColumn('status')?.getFilterValue()   as string) ?? '';
  const priorityFilter = (table.getColumn('priority')?.getFilterValue() as string) ?? '';
  const isFiltered = titleFilter || statusFilter || priorityFilter;

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search by title..."
          value={titleFilter}
          onChange={(e) => table.getColumn('title')?.setFilterValue(e.target.value || undefined)}
          className="max-w-xs"
        />

        <Select
          value={statusFilter || 'all'}
          onValueChange={(v) => table.getColumn('status')?.setFilterValue(v === 'all' ? undefined : v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Want">Want</SelectItem>
            <SelectItem value="Purchased">Purchased</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={priorityFilter || 'all'}
          onValueChange={(v) => table.getColumn('priority')?.setFilterValue(v === 'all' ? undefined : v)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon-sm"
              disabled={!isFiltered}
              onClick={() => table.resetColumnFilters()}
              aria-label="Reset filters"
            >
              <RotateCcw />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Reset filters</TooltipContent>
        </Tooltip>
      </div>

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
