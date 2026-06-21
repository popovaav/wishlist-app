import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import type { WishlistItem } from '@/api/wishlist';

export type WishlistFormState = {
  title: string;
  price: string;
  priority: WishlistItem['priority'] | '';
  status: WishlistItem['status'] | '';
};

export const emptyWishlistForm: WishlistFormState = {
  title: '',
  price: '',
  priority: '',
  status: '',
};

interface WishlistItemFormFieldsProps {
  form: WishlistFormState;
  onChange: (form: WishlistFormState) => void;
}

export function WishlistItemFormFields({ form, onChange }: WishlistItemFormFieldsProps) {
  function set(patch: Partial<WishlistFormState>) {
    onChange({ ...form, ...patch });
  }

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Title</label>
        <Input
          placeholder="Item title"
          value={form.title}
          onChange={(e) => set({ title: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Price</label>
        <Input
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={form.price}
          onChange={(e) => set({ price: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Priority</label>
        <Select
          value={form.priority}
          onValueChange={(v) => set({ priority: v as WishlistItem['priority'] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select priority" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Status</label>
        <Select
          value={form.status}
          onValueChange={(v) => set({ status: v as WishlistItem['status'] })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="Want">Want</SelectItem>
            <SelectItem value="Purchased">Purchased</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
