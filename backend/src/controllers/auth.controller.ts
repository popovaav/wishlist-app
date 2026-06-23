import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { Request, Response } from 'express';
import pool from '../db/db.js';
import type { RegisterUserInput, LoginUserInput } from '../validations/auth.validation.js';

const SALT_ROUNDS = 12;

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}
const JWT_SECRET: string = process.env.JWT_SECRET;

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

export async function loginUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as LoginUserInput;

  const result = await pool.query(
    'SELECT id, email, password FROM users WHERE email = $1',
    [email],
  );

  const user: { id: number; email: string; password: string } | undefined = result.rows[0];

  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: '7d' },
  );

  res.json({
    token,
    user: { id: user.id, email: user.email },
  });
}
