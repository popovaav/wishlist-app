import type { Request, Response } from 'express';
import pool from '../db/db.js';

export async function getWishlistItems(req: Request, res: Response): Promise<void> {
    const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
    const limit = Math.max(1, parseInt(req.query.limit as string) || 10);
    const offset = (page - 1) * limit;

    const [itemsResult, countResult] = await Promise.all([
        pool.query('SELECT * FROM wishlist_items ORDER BY id LIMIT $1 OFFSET $2', [limit, offset]),
        pool.query('SELECT COUNT(*)::int AS total FROM wishlist_items'),
    ]);

    res.json({
        items: itemsResult.rows,
        total: countResult.rows[0].total,
        page,
        limit,
    });
}

export async function createWishlistItem(req: Request, res: Response): Promise<void> {
    const { title, price, priority, status, user_id } = req.body;

    const result = await pool.query(
        `
      INSERT INTO wishlist_items
      (title, price, priority, status, user_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `,
        [title, price, priority, status, user_id]
    );

    res.status(201).json(result.rows[0]);
}

export async function updateWishlistItem(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, price, priority, status, user_id } = req.body;

    const result = await pool.query(
        `
    UPDATE wishlist_items
    SET
      title = $1,
      price = $2,
      priority = $3,
      status = $4,
      user_id = $5

    WHERE id = $6
    RETURNING *
    `,

    [title, price, priority, status, user_id, id]
    );

  if (result.rows.length === 0) {
    res.status(404).json({ message: 'Wishlist item not found' });
    return;
  }

  res.status(200).json(result.rows[0]);
}

export async function deleteWishlistItem(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const result = await pool.query( 
        'DELETE FROM wishlist_items WHERE id = $1 RETURNING *', 
        [id]
    );

    if (result.rows.length === 0) {
        res.status(404).json({ message: 'Wishlist item not found' });
        return;
    }

    res.status(204).send();
}