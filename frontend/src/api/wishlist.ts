import axios from 'axios';

export interface WishlistItem {
  id: number;
  title: string;
  price: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Want' | 'Purchased';
  user_id: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function fetchWishlist(): Promise<WishlistItem[]> {
  const { data } = await api.get<WishlistItem[]>('/wishlist');
  return data;
}

export async function createWishlistItem(
  payload: {
    title: string;
    price: string;
    priority: WishlistItem['priority'];
    status: WishlistItem['status'];
    user_id: number;
  }
) {
  const { data } = await api.post('/wishlist', payload);
  return data;
}
