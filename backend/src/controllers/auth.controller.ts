import bcrypt from 'bcrypt';
import type { Request, Response } from 'express';
import pool from '../db/db.js';
import type { RegisterUserInput } from '../validations/auth.validation.js';

const SALT_ROUNDS = 12;

export async function registerUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as RegisterUserInput;

  const existing = await pool.query(
    'SELECT id FROM users WHERE email = $1',
    [email],
  );

  if (existing.rows.length > 0) {
    res.status(409).json({ message: 'User already exists' });
    return;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const result = await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, passwordHash],
  );

  res.status(201).json(result.rows[0]);
}
