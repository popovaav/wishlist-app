import client from './client';

export interface WishlistItem {
  id: number;
  title: string;
  price: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Want' | 'Purchased';
}

export interface PaginatedWishlist {
  items: WishlistItem[];
  total: number;
  page: number;
  limit: number;
}

export interface WishlistQuery {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  priority?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function fetchWishlist(params: WishlistQuery): Promise<PaginatedWishlist> {
  const { data } = await client.get<PaginatedWishlist>('/wishlist', { params });
  return data;
}

export async function createWishlistItem(payload: {
  title: string;
  price: string;
  priority: WishlistItem['priority'];
  status: WishlistItem['status'];
}) {
  const { data } = await client.post('/wishlist', payload);
  return data;
}

export async function updateWishlistItem(
  id: number,
  payload: {
    title: string;
    price: string;
    priority: WishlistItem['priority'];
    status: WishlistItem['status'];
  },
) {
  const { data } = await client.put<WishlistItem>(`/wishlist/${id}`, payload);
  return data;
}

export async function deleteWishlistItem(id: number) {
  await client.delete(`/wishlist/${id}`);
}
