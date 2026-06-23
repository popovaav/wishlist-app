export interface User {
  id: number;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export type LoginResponse = AuthResponse;
