import { Router } from 'express';
import { getWishlistItems, createWishlistItem, updateWishlistItem, deleteWishlistItem } from '../controllers/wishlist.controller.js';
import { validate } from '../middleware/validate.js';
import { createWishlistItemSchema, updateWishlistItemSchema } from '../validations/wishlist.validation.js';

const router = Router();

router.get('/', getWishlistItems);
router.post('/', validate(createWishlistItemSchema), createWishlistItem);
router.put('/:id', validate(updateWishlistItemSchema), updateWishlistItem);
router.delete('/:id', deleteWishlistItem);

export default router;
