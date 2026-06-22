import type { Request, Response } from 'express';
import pool from '../db/db.js';

const ALLOWED_SORT_COLUMNS = new Set(['title', 'price', 'priority', 'status']);

export async function getWishlistItems(req: Request, res: Response): Promise<void> {
    const page  = Math.max(1, parseInt(req.query['page']  as string) || 1);
    const limit = Math.max(1, parseInt(req.query['limit'] as string) || 10);
    const offset = (page - 1) * limit;

    const search   = (req.query['search']   as string | undefined) ?? '';
    const status   = (req.query['status']   as string | undefined) ?? '';
    const priority = (req.query['priority'] as string | undefined) ?? '';
    const rawSortBy    = (req.query['sortBy']    as string | undefined) ?? '';
    const rawSortOrder = (req.query['sortOrder'] as string | undefined) ?? '';

    const sortBy    = ALLOWED_SORT_COLUMNS.has(rawSortBy) ? rawSortBy : 'id';
    const sortOrder = rawSortOrder === 'desc' ? 'DESC' : 'ASC';

    const filterParams: (string | number)[] = [];
    const conditions: string[] = [];

    if (search) {
        filterParams.push(`%${search}%`);
        conditions.push(`title ILIKE $${filterParams.length}`);
    }
    if (status) {
        filterParams.push(status);
        conditions.push(`status = $${filterParams.length}`);
    }
    if (priority) {
        filterParams.push(priority);
        conditions.push(`priority = $${filterParams.length}`);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const n = filterParams.length;

    const [itemsResult, countResult] = await Promise.all([
        pool.query(
            `SELECT * FROM wishlist_items ${where} ORDER BY ${sortBy} ${sortOrder} LIMIT $${n + 1} OFFSET $${n + 2}`,
            [...filterParams, limit, offset],
        ),
        pool.query(
            `SELECT COUNT(*)::int AS total FROM wishlist_items ${where}`,
            filterParams,
        ),
    ]);

    res.json({
        items: itemsResult.rows,
        total: countResult.rows[0]?.total ?? 0,
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