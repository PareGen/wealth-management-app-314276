import { useAuthStore } from '@/lib/auth-store';
import type { LoginDto, RegisterDto } from '@saas-template/core';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authService } from '../services';

export function useLogin() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginDto) => authService.login(data),
    onSuccess: (response) => {
      setAuth(response.user, response.accessToken);
      router.push('/dashboard/projects');
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: RegisterDto) => authService.register(data),
    onSuccess: (response) => {
      setAuth(response.user, response.accessToken);
      router.push('/dashboard/projects');
    },
  });
}
