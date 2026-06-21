import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { RotateCcw } from 'lucide-react';

interface WishlistTableToolbarProps {
  titleFilter: string;
  statusFilter: string;
  priorityFilter: string;
  isFiltered: boolean;
  onTitleChange: (value: string | undefined) => void;
  onStatusChange: (value: string | undefined) => void;
  onPriorityChange: (value: string | undefined) => void;
  onReset: () => void;
}

export function WishlistTableToolbar({
  titleFilter,
  statusFilter,
  priorityFilter,
  isFiltered,
  onTitleChange,
  onStatusChange,
  onPriorityChange,
  onReset,
}: WishlistTableToolbarProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <Input
        placeholder="Search by title..."
        value={titleFilter}
        onChange={(e) => onTitleChange(e.target.value || undefined)}
        className="max-w-xs"
      />

      <Select
        value={statusFilter || 'all'}
        onValueChange={(v) => onStatusChange(v === 'all' ? undefined : v)}
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
        onValueChange={(v) => onPriorityChange(v === 'all' ? undefined : v)}
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
            onClick={onReset}
            aria-label="Reset filters"
          >
            <RotateCcw />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reset filters</TooltipContent>
      </Tooltip>
    </div>
  );
}
