import axios from 'axios';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// TODO: POST /auth/login — exchange credentials for a JWT
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  // TODO: implement when backend auth is ready
  // const { data } = await api.post<AuthResponse>('/auth/login', credentials);
  // return data;
  void api;
  void credentials;
  throw new Error('login not yet implemented');
}

// TODO: POST /auth/register — create a new account and return a JWT
export async function register(payload: RegisterRequest): Promise<AuthResponse> {
  // TODO: implement when backend auth is ready
  // const { data } = await api.post<AuthResponse>('/auth/register', payload);
  // return data;
  void payload;
  throw new Error('register not yet implemented');
}
