import axios from 'axios';
import type { LoginRequest, RegisterRequest, RegisterResponse, AuthResponse } from '@/types/auth';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function register(payload: RegisterRequest): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>('/auth/register', payload);
  return data;
}

// TODO: POST /auth/login — exchange credentials for a JWT
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  // TODO: implement when backend auth is ready
  // const { data } = await api.post<AuthResponse>('/auth/login', credentials);
  // return data;
  void credentials;
  throw new Error('login not yet implemented');
}
