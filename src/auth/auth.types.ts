import { User } from '@prisma/client';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  timezone?: string;
}

export interface UserWithTokens {
  jwt: string;
  refreshToken: string;
  user: User;
}

export type LoginResponse = UserWithTokens;
export type SignupResponse = UserWithTokens;
