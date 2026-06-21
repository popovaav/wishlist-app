import { Router } from 'express';
import { getWishlistItems, createWishlistItem, updateWishlistItem, deleteWishlistItem } from '../controllers/wishlist.controller.js';

const router = Router();

router.get('/', getWishlistItems);
router.post('/', createWishlistItem);
router.put('/:id', updateWishlistItem);
router.delete('/:id',  deleteWishlistItem);

export default router;