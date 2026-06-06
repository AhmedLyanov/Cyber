import { useMutation } from '@tanstack/vue-query'
import type { LoginDto, AuthResponse } from './types'
import { authApi } from '../api/auth.api'

/**
 * Composable для управления логином пользователя
 * Использует TanStack Query для мутаций
 * Сохраняет JWT токен в cookie через useCookie()
 */
export const useLogin = () => {
  const router = useRouter()
  const authToken = useCookie<string>('auth_token', {
    maxAge: 60 * 60 * 24 * 7, 
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  })

  const loginMutation = useMutation({
    mutationFn: (data: LoginDto) => authApi.login(data),
    onSuccess: (response: AuthResponse) => {
      // Сохраняем токен в cookie
      authToken.value = response.token

      // Можно сохранить данные пользователя в локальное состояние или локальное хранилище
      // для дальнейшего использования в приложении
      if (process.client) {
        localStorage.setItem('user', JSON.stringify(response.user))
      }

      // Перенаправляем на главную страницу
      router.push('/')
    },
    onError: (error: any) => {
      console.error('Login failed:', error)
      // Ошибка будет доступна в компоненте через error ref
    },
  })

  return {
    // Основная мутация для логина
    login: (data: LoginDto) => loginMutation.mutate(data),
    
    // Состояние мутации
    isPending: loginMutation.isPending,
    isSuccess: loginMutation.isSuccess,
    isError: loginMutation.isError,
    
    // Данные и ошибки
    data: loginMutation.data,
    error: loginMutation.error,
    
    // Сохранённый токен
    token: authToken,
  }
}
