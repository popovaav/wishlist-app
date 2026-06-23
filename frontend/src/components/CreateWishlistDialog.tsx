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
import { createWishlistItem } from '@/api/wishlist';

interface CreateWishlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateWishlistDialog({ open, onOpenChange }: CreateWishlistDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<WishlistFormValues>({
    resolver: zodResolver(wishlistItemSchema),
    defaultValues: { title: '', price: '' },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: WishlistFormValues) =>
      createWishlistItem(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      form.reset();
      onOpenChange(false);
    },
  });

  function handleCancel() {
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
        </DialogHeader>

        <FormProvider {...form}>
          <WishlistItemFormFields />
        </FormProvider>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit((v) => mutate(v))} disabled={isPending}>
            {isPending ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
