import { useFormContext, Controller } from 'react-hook-form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import type { WishlistFormValues } from '@/lib/wishlistSchema';

export function WishlistItemFormFields() {
  const { register, control, formState: { errors } } = useFormContext<WishlistFormValues>();

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Title</label>
        <Input placeholder="Item title" {...register('title')} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Price</label>
        <Input type="number" min="0" step="0.01" placeholder="0.00" {...register('price')} />
        {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Priority</label>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.priority && <p className="text-sm text-destructive">{errors.priority.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select value={field.value ?? ''} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Want">Want</SelectItem>
                <SelectItem value="Purchased">Purchased</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
      </div>
    </div>
  );
}
