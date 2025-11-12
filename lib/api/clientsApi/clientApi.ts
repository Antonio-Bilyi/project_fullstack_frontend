'use client';

import { handleApiError } from "../handleApiError";
import { User } from '../../../types/user';
import { nextServer } from '../api';

export interface RegisterRequest {
  name: string;
  password: string;
  email: string;
}

export interface LoginRequest {
  password: string;
  email: string;
}

export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async (): Promise<void> => {
  try {
    await nextServer.post('/auth/logout');
  } catch (error) {
    handleApiError(error, 'logout');
    throw error;
  }
};

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.post<{ success: boolean }>('/auth/refresh');
  return res.data.success;
};
