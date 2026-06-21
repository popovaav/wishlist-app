import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { WishlistItemFormFields, emptyWishlistForm, type WishlistFormState } from './WishlistItemFormFields';
import { updateWishlistItem, type WishlistItem } from '@/api/wishlist';

interface EditWishlistDialogProps {
  item: WishlistItem | null;
  onOpenChange: (open: boolean) => void;
}

export function EditWishlistDialog({ item, onOpenChange }: EditWishlistDialogProps) {
  const [form, setForm] = useState<WishlistFormState>(emptyWishlistForm);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (item) {
      setForm({ title: item.title, price: item.price, priority: item.priority, status: item.status });
    }
  }, [item]);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updateWishlistItem(item!.id, {
        title: form.title,
        price: form.price,
        priority: form.priority as WishlistItem['priority'],
        status: form.status as WishlistItem['status'],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      onOpenChange(false);
    },
  });

  function handleCancel() {
    onOpenChange(false);
  }

  return (
    <Dialog open={!!item} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>

        <WishlistItemFormFields form={form} onChange={setForm} />

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={() => mutate()} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
