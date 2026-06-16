import { useMutation } from '@tanstack/vue-query'
import type { LoginDto, AuthResponse } from './types'
import { authApi } from '../api/auth.api'

export const useLogin = () => {
  const router = useRouter()
  const authToken = useCookie<string>('auth_token', {
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === 'production',
    httpOnly: false,
    sameSite: 'strict',
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (response: AuthResponse) => {
      authToken.value = response.token;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      router.push('/');
    },
    onError: (error: any) => {
      console.error('Login failed:', error);
    },
  });

  return {
    login: (data: LoginDto) => loginMutation.mutate(data),
    isPending: loginMutation.isPending,
    isSuccess: loginMutation.isSuccess,
    isError: loginMutation.isError,
    data: loginMutation.data,
    error: loginMutation.error,
    token: authToken,
  };
};