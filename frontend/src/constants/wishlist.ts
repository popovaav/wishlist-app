import type { WishlistItem } from '@/api/wishlist';

export const priorityStyles: Record<WishlistItem['priority'], string> = {
  High:   'border-transparent bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  Medium: 'border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  Low:    'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
};

export const statusStyles: Record<WishlistItem['status'], string> = {
  Want:      'border-transparent bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300',
  Purchased: 'border-transparent bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
};

export const priorityOrder: Record<WishlistItem['priority'], number> = { High: 3, Medium: 2, Low: 1 };
