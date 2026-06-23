import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth';
import client from './client';

export async function register(payload: RegisterRequest): Promise<RegisterResponse> {
  const { data } = await client.post<RegisterResponse>('/auth/register', payload);
  return data;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await client.post<LoginResponse>('/auth/login', credentials);
  return data;
}
