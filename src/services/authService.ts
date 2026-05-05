import { apiClient } from '@/lib/apiClient';

type LoginPayload = { email: string; password: string };
type RegisterPayload = { name: string; email: string; password: string };

type AuthResponse = {
  token: string;
  user: { id: string; name: string; email: string };
};

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    // Replace with your real endpoint
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    return data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    // Replace with your real endpoint
    const { data } = await apiClient.post<AuthResponse>('/auth/register', payload);
    return data;
  },

  me: async () => {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
};
