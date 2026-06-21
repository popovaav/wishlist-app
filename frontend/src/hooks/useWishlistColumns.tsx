import { useMemo } from 'react';
import { type Column, type ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { type WishlistItem } from '@/api/wishlist';
import { priorityStyles, statusStyles, priorityOrder } from '@/constants/wishlist';
import { usdFormatter } from '@/utils/formatters';

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

interface UseWishlistColumnsProps {
  onEdit: (item: WishlistItem) => void;
  onDeleteRequest: (item: WishlistItem) => void;
}

export function useWishlistColumns({
  onEdit,
  onDeleteRequest,
}: UseWishlistColumnsProps): ColumnDef<WishlistItem>[] {
  return useMemo<ColumnDef<WishlistItem>[]>(
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
        cell: ({ getValue }) => usdFormatter.format(Number(getValue<string>())),
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
              <DropdownMenuItem onClick={() => onEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDeleteRequest(row.original)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [onEdit, onDeleteRequest],
  );
}
