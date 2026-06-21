import { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { WishlistItemFormFields } from './WishlistItemFormFields';
import { wishlistItemSchema, type WishlistFormValues } from '@/lib/wishlistSchema';
import { updateWishlistItem, type WishlistItem } from '@/api/wishlist';

interface EditWishlistDialogProps {
  item: WishlistItem | null;
  onOpenChange: (open: boolean) => void;
}

export function EditWishlistDialog({ item, onOpenChange }: EditWishlistDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<WishlistFormValues>({
    resolver: zodResolver(wishlistItemSchema),
    defaultValues: { title: '', price: '' },
  });

  useEffect(() => {
    if (item) {
      form.reset({
        title: item.title,
        price: item.price,
        priority: item.priority,
        status: item.status,
      });
    }
  }, [item, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: (values: WishlistFormValues) =>
      updateWishlistItem(item!.id, values),
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

        <FormProvider {...form}>
          <WishlistItemFormFields />
        </FormProvider>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit((v) => mutate(v))} disabled={isPending}>
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
