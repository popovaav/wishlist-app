import { useState } from 'react';
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
import { createWishlistItem, type WishlistItem } from '@/api/wishlist';

interface CreateWishlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateWishlistDialog({ open, onOpenChange }: CreateWishlistDialogProps) {
  const [form, setForm] = useState<WishlistFormState>(emptyWishlistForm);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createWishlistItem({
        title: form.title,
        price: form.price,
        priority: form.priority as WishlistItem['priority'],
        status: form.status as WishlistItem['status'],
        user_id: 1,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      setForm(emptyWishlistForm);
      onOpenChange(false);
    },
  });

  function handleCancel() {
    setForm(emptyWishlistForm);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
        </DialogHeader>

        <WishlistItemFormFields form={form} onChange={setForm} />

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={() => mutate()} disabled={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
