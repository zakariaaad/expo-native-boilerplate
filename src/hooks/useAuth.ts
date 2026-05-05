import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

type LoginPayload = { email: string; password: string };
type RegisterPayload = { name: string; email: string; password: string };

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setAuth, logout: storeLogout } = useAuthStore();
  const router = useRouter();

  const login = async (payload: LoginPayload) => {
    setError(null);
    setIsLoading(true);
    try {
      const { token, user } = await authService.login(payload);
      await setAuth(token, user);
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e?.response?.data?.message ?? 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: RegisterPayload) => {
    setError(null);
    setIsLoading(true);
    try {
      const { token, user } = await authService.register(payload);
      await setAuth(token, user);
      router.replace('/(tabs)');
    } catch (e: any) {
      setError(e?.response?.data?.message ?? 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await storeLogout();
    router.replace('/(auth)/login');
  };

  return { login, register, logout, isLoading, error };
}
